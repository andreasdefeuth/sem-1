let content =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis interdum eleifend. Sed tempor eget sapien et fermentum. Sed a ante lacinia, adipiscing ligula at, euismod ipsum. Mauris ullamcorper congue mauris vitae venenatis. Integer dictum dui eget quam rhoncus, sit amet tempor orci cursus. Praesent nec ultrices nisl. Nam quis justo felis. Etiam dapibus condimentum augue vitae fermentum. Sed tempus mi justo.";

let heading = "Overskrift 1";

const article = {
  author: "Thomas Hvid Spangsberg",
  contact: "thsp@eaaa.dk",
  content: content,
  heading: heading,
};

console.log(article);

let mainContentArea = document.getElementById("main-content-area");

let articleToInsert = "";

articleToInsert =
  "<div id='1' class='content'>" +
  "<h1>" +
  article.heading +
  "</h1>" +
  "<p class='inner-content'>" +
  article.content +
  "</p>" +
  "<p class='author'>" +
  article.author +
  "</p>" +
  "<p class='contact'>" +
  article.contact +
  "</p>" +
  "</div>";

//mainContentArea.innerHTML += articleToInsert;
mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
