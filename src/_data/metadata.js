const dotenv = require("dotenv");

dotenv.config();

const envVariables = {
  dev: {
    urlEleventy: "http://localhost:8080",
    urlStrapi: "http://localhost:1337",
  },
  prod: {
    urlEleventy: "https://martintheo.fr",
    urlStrapi: "",
  },
};

module.exports = {
  title: "Le blog dev de Théo Martin",
  author: "Théo Martin",
  email: "artapp.theo@gmail.com",
  description:
    "Des articles, des réflexions et des anecdotes sur mon stage en développement web.",
  lang: "fr",
  themeColor: "#7B5199",
  backgroundColor: "#FEFEFE",
  ...envVariables[process.env.ELEVENTY_ENV],
};
