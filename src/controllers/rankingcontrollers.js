import { db } from "../database/database.js";


export async function getRanking(req, res) {
  try {
    const usersWithLinks = await getTopUsersWithLinks();

    res.send(usersWithLinks);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


async function getTopUsersWithLinks() {
  const query = `
    SELECT
      users.id,
      users.name,
      COALESCE(COUNT(urls."userId"), 0) as "linksCount",
      COALESCE(SUM(urls."visitCount"), 0) as "visitCount"
    FROM users
    LEFT JOIN urls
      ON users.id = urls."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
  `;

  const result = await db.query(query);

  return result.rows;
}
