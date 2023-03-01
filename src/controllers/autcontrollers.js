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
    const user = await connection.query(`SELECT * FROM users WHERE email=$1;`, [email])

    if(user.rowCount === 0){
        return res.sendStatus(401)
    }else if(!bcrypt.compareSync(password, user.rows[0].password)){
        return res.sendStatus(401)
    }

    const token = uuidV4()

    await connection.query(`
        INSERT INTO sessions (token, "userId")
        VALUES ($1, $2);
    `, [token, user.rows[0].id])

    res.status(200).send({token})
} catch (error) {
  res.status(500).send(error.message);
}

}
