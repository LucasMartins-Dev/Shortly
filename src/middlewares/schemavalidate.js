import { db } from "../database/database.js";


export function validateSchema(schema) {
  
  return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = error.details.map((err) => err.message);
			return res.status(422).send(errorMessages);
		}

		next();
	};
}



export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) return res.sendStatus(401);

	const session = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);

	if (session.rowCount === 0) return res.sendStatus(401);

  res.locals.session = session.rows[0]

  next()
}