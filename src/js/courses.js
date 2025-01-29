const { fetchData } = require("./fetchData");

const coursesTable = document.querySelector("table");
const courseCodeBtn = document.getElementById("course-code");
const courseNameBtn = document.getElementById("course-name");
const courseProgBtn = document.getElementById("course-progression");
const courseInput = document.getElementById("search");

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";
let coursesData;

courseInput.addEventListener("keyup", () => sortCoursesByInput());

courseCodeBtn.addEventListener("click", (e) => sortCoursesAlphabetically(e, 0));
courseNameBtn.addEventListener("click", (e) => sortCoursesAlphabetically(e, 1));
courseProgBtn.addEventListener("click", (e) => sortCoursesAlphabetically(e, 2));

async function fetchCourses(url) {
  return await fetchData(url);
}

async function displayCourses(coursesData) {
  const tbody = document.createElement("tbody");
  coursesData.forEach((obj) => {
    const tr = document.createElement("tr");
    const tdCode = document.createElement("td");
    tdCode.innerHTML = obj[0];
    const tdCourseName = document.createElement("td");
    tdCourseName.innerHTML = obj[1];
    const tdProgression = document.createElement("td");
    tdProgression.innerHTML = obj[2];

    tr.appendChild(tdCode);
    tr.appendChild(tdCourseName);
    tr.appendChild(tdProgression);

    tbody.appendChild(tr);
  });

  coursesTable.appendChild(tbody);
}

function sortCoursesAlphabetically(e, key) {
  const clickedBtn = e.target;
  if (
    !clickedBtn.hasAttribute("order") ||
    clickedBtn.getAttribute("order") === "descending"
  ) {
    coursesData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    clickedBtn.setAttribute("order", "ascending");
  } else {
    coursesData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    clickedBtn.setAttribute("order", "descending");
  }
  updateDisplayedCourses(coursesData);
}

function removeDisplayedCourses() {
  document.querySelector("tbody").remove();
}

function updateDisplayedCourses(coursesData) {
  removeDisplayedCourses();
  displayCourses(coursesData);
}

// Can't use top level await, so I use an immediately-invoked async function instead...
(async () => {
  coursesData = await fetchCourses(url);
  displayCourses(coursesData);
})();
