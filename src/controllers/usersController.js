import { db } from "../database/database.js";


export async function getUserLinks(req, res) {
  const session = res.locals.session;

  try {
    const links = await db.query(`
      SELECT
        users.id,
        users.name,
        COALESCE(SUM(urls.visitCount), 0) AS visitCount,
        ARRAY_AGG(json_build_object(
          'id', urls.id,
          'shortUrl', urls.shortenUrl,
          'url', urls.url,
          'visitCount', urls.visitCount
        )) AS shortenedUrls
      FROM users
      LEFT JOIN urls 
        ON users.id = urls.userId
      WHERE users.id = $1
      GROUP BY users.id
    `, [session.userId]);

    res.status(200).send(links.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
