import { db } from "../database/database.js"
import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";


export async function signUp(req, res) {

  try {
    const user = res.locals.user;
    const { name, email, password } = user;

    const hashPassword = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password, confirmPassword) VALUES($1, $2, $3 , $4);`,
      [name, email, hashPassword,hashPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

  

export async function signIn(req, res) {
 
  const login = res.locals.userLogin;
  const { email, password } = login;
  const token = tokenGenerator();

  try {
    const findId = await connectionDB.query(
      `SELECT id, name FROM users WHERE email=$1;`,
      [email]
    );
    const userId = findId.rows[0].id;
    await connectionDB.query(
      `INSERT INTO sessions (user_id, token) VALUES ($1, $2);`,
      [userId, token]
    );

    return res.status(200).send(token);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

}
