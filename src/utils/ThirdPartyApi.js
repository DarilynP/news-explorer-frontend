// const API_KEY = "c608435d13a646328c916afd1a913da9";

export async function getNews(search) {
  // Use environment variable instead of hardcoded localhost URL
  // const url = `${import.meta.env.VITE_BACKEND_URL}/api/news?q=${encodeURIComponent(search)}`;
  const url = `http://localhost:3002/api/news?q=${encodeURIComponent(search)}`;
  console.log("🔍 Fetching news with URL:", url);
  console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);


  try {
    const res = await fetch(url, {
      method: "GET",
      // credentials: "include" // only if your backend uses cookies
    });

    console.log("📡 Response received:", res);

    if (!res.ok) {
      console.error("Response not OK:", res.status, res.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log("News fetched:", data.articles?.length || 0);
    return data.articles || [];
  } catch (err) {
    console.error("🔥 Failed to fetch news from backend:", err);
    return [];
  }
}