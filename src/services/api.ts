import { config } from "../config";

export const searchImages = async (
  query: string,
  page: number = 1
): Promise<any> => {
  try {
    const response = await fetch(
      `${config.PIXABAY_API_URL}?key=${
        config.PIXABAY_API_KEY
      }&q=${encodeURIComponent(query)}&page=${page}&per_page=20`
    );
    const data = await response.json();
    return {
      results: data.hits.map((hit: any) => ({
        id: hit.id,
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
      })),
      total_pages: Math.ceil(data.totalHits / 20),
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
