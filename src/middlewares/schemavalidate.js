import { db } from "../database/database.js";
import { lSchema, uSchema } from "../schemas/uSchema.js";
import bcrypt from "bcrypt";

export async function validateUSchema(req, res, next) {
  const user = req.body;

  const { error } = uSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  try {
    const emailExists = await db.query(
      `SELECT email FROM "users" WHERE email=$1`,
      [user.email]
    );

    if (emailExists.rowCount > 0) {
      return res.sendStatus(409);
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function validateLSchema(req, res, next) {
  const login = req.body;
  const { email, password } = login;

  const { error } = lSchema.validate(login, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  try {
    const findUser = await db.query(
      `SELECT email, password FROM users WHERE email=$1;`,
      [email]
    );

    if (findUser.rowCount > 1) {
      return res.sendStatus(401);
    }

    const passwordOk = bcrypt.compareSync(password, findUser.rows[0].password);
    if (!passwordOk) {
      return res.sendStatus(401);
    }

    res.locals.userLogin = login;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
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