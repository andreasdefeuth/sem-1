import express from "express";
import { pool } from "../db/connect.js";

const db = pool();
const port = 3002;
const server = express();
server.use(express.static("frontend"));
server.use(onEachRequest);
server.get("/api/artist/:id", onGetArtistById);
server.get("/api/albumsByReleaseDate", onGetAlbumsByReleaseDate);
server.get("/api/albumsByArtist/:artist/albums", onGetAlbumsByArtist);
server.get("/api/tracksByAlbum/:title/tracks", onGetTracksByAlbum);
server.get("/api/tracksByArtist/:artist/tracks", onGetTracksByArtist);
server.get(
  "/api/tracksAndGenreByArtist/:artist/tracks",
  onGetTracksAndGenreByArtist,
);
server.get("/api/mediaType/:playlist/:nationality", onGetMediaType);
server.get("/api/nationalities/:name/:genre", onGetNationalities);
server.get("/api/albumCount", onGetAlbumCount);
server.get("/api/albumCount2", onGetAlbumCount2);
server.get("/api/albumCountNull", onGetAlbumCountNull);
server.listen(port, onServerReady);

async function onGetAlbumCountNull(request, response) {
  const limit = request.query.limit;
  const dbResult = await db.query(
    `
        select   stage_name, count(title) as album_count
        from     artists
        left join     albums using (artist_id)
        group by stage_name
        order by album_count desc
        limit    $1;`,
    [limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetAlbumCount2(request, response) {
  const limit = request.query.limit;
  const dbResult = await db.query(
    `   select    stage_name, title, release_date
        from      artists
        left join albums using (artist_id)`,
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetAlbumCount(request, response) {
  const limit = request.query.limit;
  const dbResult = await db.query(
    `
        select   stage_name, count(*) as album_count
        from     artists
        join     albums using (artist_id)
        group by stage_name
        order by album_count desc
        limit    $1;`,
    [limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetNationalities(request, response) {
  const name = request.params.name;
  const genre = request.params.genre;
  const dbResult = await db.query(
    `   select distinct nationality
        from   artists
        join   albums using (artist_id)
        join   tracks using (album_id)
        join   playlist_track using (track_id)
        join   playlists using (playlist_id)
        join   users using (user_id)
        join   genres g using (genre_id)
        where  screen_name = $1 and g.name = $2;`,
    [name, genre],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetMediaType(request, response) {
  const playlist = request.params.playlist;
  const nationality = request.params.nationality;
  const dbResult = await db.query(
    `   select distinct m.name
        from   media_types m
        join   tracks using (media_type_id)
        join   albums using (album_id)
        join   artists using (artist_id)
        join   playlist_track using (track_id)
        join   playlists p using (playlist_id)
        where  nationality = $2 and p.name = $1;`,
    [playlist, nationality],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetTracksAndGenreByArtist(request, response) {
  const artist = request.params.artist;
  const dbResult = await db.query(
    `   select   t.title as track, t.milliseconds as playing_time, g.name as genre
        from     tracks t
        join     albums using (album_id)
        join     artists using (artist_id)
        join     genres g using (genre_id)
        where    stage_name = $1
        order by t.milliseconds asc;`,
    [artist],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetTracksByArtist(request, response) {
  const artist = request.params.artist;
  const dbResult = await db.query(
    `   select   t.title, t.milliseconds
        from     tracks t
        join     albums using (album_id)
        join     artists using (artist_id)
        where    stage_name = $1
        order by t.milliseconds asc;`,
    [artist],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetTracksByAlbum(request, response) {
  const title = request.params.title;
  const dbResult = await db.query(
    `   select   t.title, t.milliseconds
        from     tracks t
        join     albums a using (album_id)
        where    a.title = $1
        order by t.milliseconds asc;`,
    [title],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetArtistById(request, response) {
  const id = request.params.id;
  const dbResult = await db.query(
    `
        select stage_name, nationality
        from   artists
        where  artist_id = $1;`,
    [id],
  );
  const rows = dbResult.rows;
  if (rows.length === 0) {
    response.sendStatus(404);
  } else {
    response.json(rows[0]);
  }
}

async function onGetAlbumsByReleaseDate(request, response) {
  const limit = request.query.limit;
  const dbResult = await db.query(
    `
        select   stage_name, title, release_date
        from     artists
        join     albums using (artist_id)
        order by release_date desc
        limit    $1;`,
    [limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetAlbumsByArtist(request, response) {
  const artist = request.params.artist;
  const limit = request.query.limit;
  const dbResult = await db.query(
    `   select   title, release_date, riaa_certificate
        from     albums
        join     artists using (artist_id)
        where    stage_name = $1
        order by title asc
        limit    $2;`,
    [artist, limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

function onServerReady() {
  console.log("Webserver running on port", port);
}

function onEachRequest(request, response, next) {
  console.log(new Date(), request.method, request.url);
  next();
}
