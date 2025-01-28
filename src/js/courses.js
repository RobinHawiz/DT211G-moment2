const { fetchData } = require("./fetchData");
const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";

const coursesTable = document.querySelector("table");

async function fetchCourses(url) {
  return await fetchData(url);
}

async function displayCourses(coursesData) {
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

// Can't use top level await, so I use an immediately-invoked async function instead...
(async () => {
  let coursesData = await fetchCourses(url);
  displayCourses(coursesData);
})();
