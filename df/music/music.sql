create table albums (
  artist text,
  title text,
  year integer
);

insert into albums (artist, title, year) values
    ('Dua Lipa', 'One Kiss', 2020);

insert into albums (artist, title, year) values
    ('MØ', 'Lean On', 2016),
    ('Michael Jackson', 'Beat It', 2012);

insert into albums (artist, title) values
    ('Jeff Epstein', 'Children');

delete from albums
where artist = 'MØ';

delete from albums
where year is null;

INSERT INTO albums (artist, title, year)
VALUES 
    ('Pink Floyd', 'The Piper at the Gates of Dawn', 1967),
    ('Pink Floyd', 'A Saucerful of Secrets', 1968),
    ('Pink Floyd', 'Meddle', 1971),
    ('Pink Floyd', 'The Dark Side of the Moon', 1973),
    ('Pink Floyd', 'Wish You Were Here', 1975),
    ('Pink Floyd', 'Animals', 1977),
    ('Pink Floyd', 'The Wall', 1979),
    ('Pink Floyd', 'The Final Cut', 1983),
    ('Pink Floyd', 'A Momentary Lapse of Reason', 1987),
    ('Pink Floyd', 'The Division Bell', 1994);

delete from albums
where year < 1970;