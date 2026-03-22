let mainContentArea = document.getElementById("main-content-area");

fetchData("Data/data.json").then((data) => {
  //Al kode som bruger "data" inde mellem de krøllede parateser: {}

  console.log(data);

  let articleToInsert = "";

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].heading);

    articleToInsert =
      "<div id='" +
      data[i].id +
      "' class='content'>" +
      "<h1>" +
      data[i].heading +
      "</h1>" +
      "<p class='inner-content'>" +
      data[i].content +
      "</p>" +
      "<p class='author'>" +
      data[i].author +
      "</p>" +
      "<p class='contact'>" +
      data[i].email +
      "</p>" +
      "</div>";

    mainContentArea.innerHTML += articleToInsert;
  }
});

//Magi - det taler vi om senere!!
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
