import "../style/style.scss";

var path = window.location.pathname;
var page = path.split("/").slice(-2)[0];

if (page === "pappaskamt") {
  const button = document.querySelector(".generate-joke");

  button.addEventListener("click", () => {
    import("./generateJoke.js").then(async ({ generateJoke }) => {
      const paragraphJoke = document.querySelector(".joke");
      paragraphJoke.innerHTML = await generateJoke();
    });
  });
}
