import { db } from "../database/database.js";
import { lSchema, uSchema } from "../schemas/uSchema.js";
import bcrypt from "bcrypt";

export function validateSchema(schema) {
  
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).send(error.message);
    }
    next();
  }
}



export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const confirmToken = await db.query(
      `SELECT * FROM sessions WHERE token=$1;`,
      [token]
    );
    if (confirmToken.rowCount < 1) {
      return res.sendStatus(401);
    }
    const userId = confirmToken.rows[0].user_id;

    res.locals.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}