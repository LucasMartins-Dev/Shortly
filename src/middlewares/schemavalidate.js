import { db } from "../database/database.js";


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
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')
  if (!token) return res.status(401).send("Informe o token!")
  try {
    const checkSession = await connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
    if(checkSession.rowCount === 0){
        return res.status(401).send("Você não tem autorização")
    }
    res.locals.session = checkSession
    next()
  } catch (error) {
    res.status(500).send(error);
  }
}