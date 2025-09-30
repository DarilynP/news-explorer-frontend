export async function getNews(search) {
  const url = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3002"}/api/news?q=${encodeURIComponent(search)}`;
  console.log("🔍 Fetching news with URL:", url);

  try {
    const res = await fetch(url, { method: "GET" });
    console.log("📡 Response received:", res);

    if (!res.ok) {
      console.error("Response not OK:", res.status, res.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log("News fetched:", data.length);
    return data; 
  } catch (err) {
    console.error(" Failed to fetch news from backend:", err);
    return [];
  }
}
