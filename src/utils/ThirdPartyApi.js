const API_KEY = "c608435d13a646328c916afd1a913da9";

export function getNews(search) {
  const url = `https://newsapi.org/v2/everything?pageSize=10&apiKey=${API_KEY}&q=${search}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("netwrok reponse was not ok");
      }
      return res.json();
    })
    .then((data) => data.articles)
    .catch((err) => {
      console.log("failed to fetch news", err);
      return [];
    });
}
