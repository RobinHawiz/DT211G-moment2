const { fetchData } = require("./fetchData");

const coursesTable = document.querySelector("table");
const courseCodeBtn = document.getElementById("course-code");
const courseNameBtn = document.getElementById("course-name");
const courseProgBtn = document.getElementById("course-progression");

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";
let coursesData;

courseCodeBtn.addEventListener("click", () =>
  sortCoursesAlphabetically("code")
);
courseNameBtn.addEventListener("click", () =>
  sortCoursesAlphabetically("coursename")
);
courseProgBtn.addEventListener("click", () =>
  sortCoursesAlphabetically("progression")
);

async function fetchCourses(url) {
  return await fetchData(url);
}

async function displayCourses() {
  const tbody = document.createElement("tbody");
  coursesData.forEach((obj) => {
    const tr = document.createElement("tr");
    const tdCode = document.createElement("td");
    tdCode.innerHTML = obj.code;
    const tdCourseName = document.createElement("td");
    tdCourseName.innerHTML = obj.coursename;
    const tdProgression = document.createElement("td");
    tdProgression.innerHTML = obj.progression;

    tr.appendChild(tdCode);
    tr.appendChild(tdCourseName);
    tr.appendChild(tdProgression);

    tbody.appendChild(tr);
  });

  coursesTable.appendChild(tbody);
}

function sortCoursesAlphabetically(key) {
  if (
    !courseCodeBtn.hasAttribute("order") ||
    courseCodeBtn.getAttribute("order") === "descending"
  ) {
    coursesData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    courseCodeBtn.setAttribute("order", "ascending");
  } else {
    coursesData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    courseCodeBtn.setAttribute("order", "descending");
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
  displayCourses();
})();
