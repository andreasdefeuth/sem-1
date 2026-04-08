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
