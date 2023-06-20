const apiConfig = {
  base_url: "https://api.themoviedb.org/3",
  api_key: "ec696be1618e904704c7be1a8fe86470",
  original_image: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500_image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  // embed_to: `https://www.2embed.to/embed/tmdb`
  embed_to: `https://netreelz.vercel.app`
};

export default apiConfig;