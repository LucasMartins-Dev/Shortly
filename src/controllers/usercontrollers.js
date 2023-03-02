

import { db } from "../database/database.js";

export async function getUser(req, res){
    try{
        const userId = res.locals.userId;
        const user = await db.query(`SELECT id, name, user_count FROM users WHERE id=$1;`,[userId]);
        if(user.rowCount<1){
            return res.sendStatus(404);
        }
        const { id, name, user_count} = user.rows[0];

        
        const urls = await db.query(`SELECT id, short_url AS "shortUrl", url, visit_count AS "visitCount" FROM urls WHERE user_id=$1;`,[userId]);
        
        const resObj = {
            id,
            name,
            visitCount:user_count,
            shortenedUrls:urls.rows
        }

        return res.status(200).send(resObj)

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }


}

export async function getRanking(req, res) {
    try {
        const ranking = await db.query(`SELECT users.id AS id, users.name AS name, COUNT(urls."userId") AS "linksCount", SUM(urls."visitCount") as "visitCount" FROM users JOIN urls ON urls."userId"=users.id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`)
        res.status(200).send(ranking.rows)
    } catch (error) {
      res.status(500).send(error.message);
    }
}