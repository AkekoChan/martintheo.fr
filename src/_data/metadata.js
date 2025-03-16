import dotenv from "dotenv";

dotenv.config();

const envVariables = {
  dev: {
    urlEleventy: "http://localhost:8080",
    urlStrapi: "http://localhost:1337",
  },
  prod: {
    urlEleventy: "https://martintheo.fr",
    urlStrapi: "https://backend.martintheo.fr",
  },
};

export default {
  title: "Théo Martin - Développement front-end & Design web",
  author: "Théo Martin",
  email: "artapp.theo@gmail.com",
  description:
    "Plongez dans mes créations et articles, où le code et le design s’allient pour des résultats percutants, par Théo Martin.",
  lang: "fr",
  themeColor: "#7B5199",
  backgroundColor: "#FEFEFE",
  ...envVariables[process.env.ELEVENTY_ENV],
};
