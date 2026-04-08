import { connect } from "./connect.js";
import upload from "pg-upload";

const db = await connect();
const timestamp = (await db.query("select now() as timestamp")).rows[0][
  "timestamp"
];
console.log(`Recreating database on ${timestamp}...`);

console.log("Dropping existing tables...");
await db.query("drop table if exists actors");
await db.query("drop table if exists castings");
await db.query("drop table if exists movies");

console.log("Creating tables...");
await db.query(`
    create table actors (
        actor_id    integer,
        stage_name  text,
        nationality char(2),
        sex         char(1)
    )
`);
await db.query(`
    create table castings (
        actor_id integer,
        movie_id integer,
        role     text
    )
`);
await db.query(`
    create table movies (
        movie_id integer,
        year     integer,
        title    text
    )
`);

console.log("Importing csv-data into tables...");
await upload(
  db,
  "db/actors.csv",
  `
    copy actors (actor_id, stage_name, nationality, sex)
    from stdin
    with csv encoding 'UTF-8'
`,
);
await upload(
  db,
  "db/castings.csv",
  `
    copy castings (movie_id, actor_id, role)
    from stdin
    with csv header encoding 'UTF-8'
`,
);
await upload(
  db,
  "db/movies.csv",
  `
    copy movies (movie_id, title, year)
    from stdin
    with csv header encoding 'UTF-8'
`,
);
await db.end();
console.log("Database successfully recreated.");
