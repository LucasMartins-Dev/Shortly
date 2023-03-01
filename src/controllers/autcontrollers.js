import { db } from "../database/database.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function signUp(req, res) {

  const { name, email, password } = req.body;
  try {
    
    const hasEmail = await db.query('SELECT * FROM users WHERE email = $1', [email])

    if (hasEmail.rowCount !== 0) return res.sendStatus(409)
  
    const hashPassword =  bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES($1, $2, $3 );`,
      [name, email, hashPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

  

export async function signIn(req, res) {
 
  const {email, password} = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

    if ((userExists.rows.length !== 0) && bcrypt.compareSync(password, userExists.rows[0].password)) {
      const token = uuid();
      await db.query(`
          DELETE FROM sessions 
          WHERE "userId" = $1
      `,[userExists.rows[0].id]);
      await db.query(`
          INSERT INTO sessions
          (token,"userId","createdAt") 
          VALUES ($1, $2,NOW())
      `,[token,userExists.rows[0].id]);
      res.status(200).send({token});
  } else {
      return res.sendStatus(401);
  }
  } catch (err) {
    res.status(500).send(err.message)
  }

}
