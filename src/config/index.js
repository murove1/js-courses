const config = {
  devBuild:
    (process.env.NODE_ENV || "development").trim().toLowerCase() ===
    "development",
    api_url: "https://ask-apiko-api-yurakruhlyk.herokuapp.com" // prod
  // api_url: "http://127.0.0.1:3001" // dev
};

export default config;
