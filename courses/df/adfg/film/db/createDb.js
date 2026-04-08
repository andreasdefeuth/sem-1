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




await db.query(`
    create table contributor (
        contributor_id integer primary key,
        name text not null
    )
`);

await db.query(`
    create table genre (
        genre_id integer primary key,
        name text not null
    )
`);

await db.query(`
    create table user (
        user_id integer primary key,
        name text not null
    )
`);

await db.query(`
    create table movie(
        movie_id integer primary key,
        name text not null,
        release text not null,
        duration text not null,
        language text not null,
    )
`);

await db.query(`
    create table crew (
        movie_id integer primary key,
        contributor_id integer not null foreign key,
        role text not null,
        function text not null
    )
`);

await db.query(`
    create table movie_genre (
        movie_id integer primary key,
        genre_id integer not null foreign key
    )
`);

await db.query(`
    create table rating (
        rating_id integer primary key,
        movie_id integer not null foreign key,
        user_id integer not null foreign key
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
