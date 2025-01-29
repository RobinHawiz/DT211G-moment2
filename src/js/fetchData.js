async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Nätverksproblem - felaktigt svar från servern");
    }
    const data = await response.json();
    return convertData(data);
  } catch (error) {
    console.error("Det uppstod ett fel:", error.message);
  }
}

function convertData(data) {
  let output = [];
  data.forEach((obj) => {
    // We convert objects into arrays in order to be able to utilize array methods later on.
    output.push([...Object.values(obj)]);
  });
  return output;
}

module.exports = { fetchData };
