const PIXABAY_API_KEY = "19160999-e6939f6d91ae531d713b89727";
const PIXABAY_API_URL = "https://pixabay.com/api/";

export const getRandomImage = async (topic?: string) => {
  try {
    const searchTerm = topic || "nature";
    const response = await fetch(
      `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        searchTerm
      )}&per_page=100&safesearch=true`
    );
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.hits.length);
      const hit = data.hits[randomIndex];
      return {
        id: hit.id.toString(),
        urls: {
          regular: hit.webformatURL,
          full: hit.largeImageURL,
        },
        alt_description: hit.tags,
        user: {
          name: hit.user,
          links: {
            html: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
          },
        },
      };
    }
    throw new Error("No images found");
  } catch (error) {
    console.error("Error fetching random image:", error);
    throw error;
  }
};
