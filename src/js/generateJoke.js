export async function generateJoke() {
  const url = "https://icanhazdadjoke.com";
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  let joke = await fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((json) => {
      return json.joke;
    })
    .catch((error) => {
      console.error(error);
    });
  return joke;
}
