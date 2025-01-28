async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Nätverksproblem - felaktigt svar från servern");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Det uppstod ett fel:", error.message);
  }
}

module.exports = { fetchData };
