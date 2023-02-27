import { db } from "../database/database.js"
import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";


export async function signUp(req, res) {

    try {
      const existsUser = await db
        .collection("Users")
        .find({ name: req.body.name })
        .toArray();
      if (existsUser.length !== 0) {
        console.log("Usuário já existe");
        res.sendStatus(409);
        return;
      }
  
      const pswd = bcrypt.hashSync(req.body.password, 10);
      await db.collection("Users").insertOne({
        name: req.body.name,
        email: req.body.email,
        password: pswd,
        confirmpassword:pswd,
      });
      res.sendStatus(201);
    } catch (erro) {
      console.log(erro);
      return res.sendStatus(500);
    }
  }

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const existsUser = await db.collection("Users").findOne({ email });
    console.log(existsUser)
    if (!existsUser) {
      return res.status(401).send('Usuário ou senha incorretos');
    }
    const pswd = bcrypt.compareSync(password, existsUser.password);

    if (!pswd) {
      return res.status(401).send('Usuário ou senha incorretos');
    }
    const token = tokenGenerator();
    await db
      .collection("sessions")
      .insertOne({ token, user: existsUser._id });

    res.send({ token , user: existsUser.name });
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
