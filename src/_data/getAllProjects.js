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
    const formattedImages = project.attributes.medias.data.reduce(
      (acc, item) => {
        acc.push({
          url: item.attributes.url,
          alt: item.attributes.alternativeText,
        });
        return acc;
      },
      []
    );

    const servicesNames = project.attributes.services.data.reduce(
      (acc, item) => {
        return acc.concat(Object.values(item.attributes));
      },
      []
    );

    return {
      id: project.id,
      title: project.attributes.title,
      description: project.attributes.description,
      about: project.attributes.about,
      date: project.attributes.date,
      slug: project.attributes.slug,
      github: project.attributes.github,
      link: project.attributes.link,
      medias: formattedImages,
      services: servicesNames,
      thumbnail: {
        url: project.attributes.thumbnail.data.attributes.url,
        alt: project.attributes.thumbnail.data.attributes.alternativeText,
      },
    };
  });

  return formattedProjects;
};

export default getAllProjects;
