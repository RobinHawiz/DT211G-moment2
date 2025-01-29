const { fetchData } = require("./fetchData");

const coursesTable = document.querySelector("table");
const courseCodeBtn = document.getElementById("course-code");
const courseNameBtn = document.getElementById("course-name");
const courseProgBtn = document.getElementById("course-progression");
const courseInput = document.getElementById("search");

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";
// The original source of data. This should not be tampered with.
// And no I can't make it a constant, because I need to assign it a value and can't assign that value here (and need its scope to be at the top level).
let coursesData;
// Use this array to change its contents instead.
let sortedCoursesData;

courseInput.addEventListener("keyup", () => sortCoursesByInput());

courseCodeBtn.addEventListener("click", (e) =>
  sortCoursesAlphabetically(sortedCoursesData, e, 0)
);
courseNameBtn.addEventListener("click", (e) =>
  sortCoursesAlphabetically(sortedCoursesData, e, 1)
);
courseProgBtn.addEventListener("click", (e) =>
  sortCoursesAlphabetically(sortedCoursesData, e, 2)
);

async function fetchCourses(url) {
  return await fetchData(url);
}

async function displayCourses(data) {
  const tbody = document.createElement("tbody");
  data.forEach((obj) => {
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

function sortCoursesAlphabetically(data, e, key) {
  const clickedBtn = e.target;
  if (
    !clickedBtn.hasAttribute("order") ||
    clickedBtn.getAttribute("order") === "descending"
  ) {
    data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    clickedBtn.setAttribute("order", "ascending");
  } else {
    data.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    clickedBtn.setAttribute("order", "descending");
  }
  updateDisplayedCourses(data);
}

function sortCoursesByInput() {
  sortedCoursesData = coursesData.filter((c) => {
    return (
      c[0].toLowerCase().includes(courseInput.value.toLowerCase()) ||
      c[1].toLowerCase().includes(courseInput.value.toLowerCase()) ||
      c[2].toLowerCase().includes(courseInput.value.toLowerCase())
    );
  });
  updateDisplayedCourses(sortedCoursesData);
}

function removeDisplayedCourses() {
  document.querySelector("tbody").remove();
}

function updateDisplayedCourses(data) {
  removeDisplayedCourses();
  displayCourses(data);
}

// Can't use top level await, so I use an immediately-invoked async function instead...
(async () => {
  coursesData = await fetchCourses(url);
  sortedCoursesData = coursesData;
  displayCourses(coursesData);
})();
