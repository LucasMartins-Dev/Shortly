import { db } from "../database/database.js"
import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";


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
 
  const { email, password } = req.body;
  const token = tokenGenerator();

  try {
    const findId = await db.query(
      `SELECT id, name FROM users WHERE email=$1;`,
      [email]
    );
    const userId = findId.rows[0].id;
    await db.query(
      `INSERT INTO sessions (user_id, token) VALUES ($1, $2);`,
      [userId, token]
    );

    return res.status(200).send(token);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

}
