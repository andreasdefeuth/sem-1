import express from "express";
import { pool } from "../db/connect.js";

const db = pool();

const port = 3003;
const server = express();
server.use(express.static("frontend"));
server.use(onEachRequest);
server.get("/api/actor/:actor/costars", onGetCostarsForActor);
server.listen(port, onServerReady);

async function onGetCostarsForActor(request, response) {
  const actor = request.params.actor;
  const dbResult = await db.query(
    `
    select distinct a2.stage_name as costar, m0.title as movie
        from   actors   a1
        join   castings c1 on c1.actor_id = a1.actor_id
        join   movies   m0 on m0.movie_id = c1.movie_id
        join   castings c2 on c2.movie_id = m0.movie_id
        join   actors   a2 on a2.actor_id = c2.actor_id
        where  a1.stage_name = $1 and a1.actor_id <> a2.actor_id`,
    [actor],
  );
  response.json(dbResult.rows);
}

function onServerReady() {
  console.log("Webserver running on port", port);
}

function onEachRequest(request, response, next) {
  console.log(new Date(), request.method, request.url);
  next();
}
