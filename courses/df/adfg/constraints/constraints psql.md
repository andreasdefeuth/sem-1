# Constraints

Check

alter table tracks
add constraint lengthOfTrack
check (milliseconds >= 0);

alter table tracks
drop constraint lengthOfTrack;

Not null

alter table artists
alter column nationality
set not null;

alter table artists
alter column nationality
drop not null;

alter table artists
add column active boolean not null default true;

Unique

alter table artists
add constraint unique_stage_name 
unique (stage_name);

alter table artists
drop constraint unique_stage_name;

alter table artists
add constraint unique_stage_name_nationality
unique (stage_name, nationality);

Foreign key / References

alter table artists
add constraint unique_artist_id
unique (artist_id);

alter table albums
add constraint foreignKey
foreign key (artist_id)
references artists (artist_id);

alter table albums
drop constraint foreignKey;

alter table tracks
add constraint unique_album_id
unique (album_id, track_id);

alter table tracks
add constraint foreignKey2
foreign key (album_id)
references albums (album_id);