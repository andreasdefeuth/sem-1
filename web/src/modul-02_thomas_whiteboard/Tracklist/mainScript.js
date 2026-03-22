async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}

let containerForAlbumNames = document.getElementById("container");
let genre = "";

let g1 = document.getElementById("g1");
let g2 = document.getElementById("g2");
let g3 = document.getElementById("g3");

fetchData(albums.json).then(function (data) {
  console.log(data);

  const albums = data.ablums;
  albums.forEach(function(album{
    if(album.tracks[0].genre.name == genre || genre == "")let pElement = document.createElement("p")
    pElement.innerText = album.title;
    containerForAlbumNames.appendChild(pElement)
  }))
});

function setGenre(e){
  console.log(e);
  genre=e.target.innerText;
}