import EleventyFetch from "@11ty/eleventy-fetch";
import dotenv from "dotenv";
import qs from "qs";
import metadata from "./metadata.js";

dotenv.config();

const getAllProjects = async () => {
  const url = `${metadata.urlStrapi}/api/`;

  const query = qs.stringify(
    {
      fields: [
        "title",
        "description",
        "about",
        "date",
        "slug",
        "github",
        "link",
      ],
      populate: {
        medias: {
          fields: ["url", "alternativeText"],
        },
        services: {
          fields: ["name"],
        },
        thumbnail: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const projects = await EleventyFetch(`${url}projects?${query}`, {
    duration: "12h",
    type: "json",
  });

  const formattedProjects = projects.data.map((project) => {
    const formattedImages = project.medias.reduce((acc, item) => {
      acc.push({
        url: item.url,
        alt: item.alternativeText,
      });
      return acc;
    }, []);

    const servicesNames = project.services.reduce((acc, item) => {
      return acc.concat(item.name);
    }, []);

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      about: project.about,
      date: project.date,
      slug: project.slug,
      github: project.github,
      link: project.link,
      medias: formattedImages,
      services: servicesNames,
      thumbnail: {
        url: project.thumbnail.url,
        alt: project.thumbnail.alternativeText,
      },
    };
  });

  return formattedProjects;
};

export default getAllProjects;
