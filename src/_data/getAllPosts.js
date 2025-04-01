import EleventyFetch from "@11ty/eleventy-fetch";
import dotenv from "dotenv";
import qs from "qs";
import metadata from "./metadata.js";

dotenv.config();

const getAllPosts = async () => {
  const url = `${metadata.urlStrapi}/api/`;

  const query = qs.stringify(
    {
      fields: [
        "title",
        "description",
        "content",
        "createdAt",
        "updatedAt",
        "isInteresting",
        "slug",
      ],
      populate: {
        categories: {
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

  const posts = await EleventyFetch(`${url}posts?${query}`, {
    duration: "1w",
    type: "json",
  });

  const formattedPosts = posts.data.map((post) => {
    const categoryNames = post.categories.reduce((acc, item) => {
      return acc.concat(item.name);
    }, []);

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      isInteresting: post.isInteresting,
      date: {
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
      slug: post.slug,
      categories: categoryNames,
      thumbnail: {
        url: post.thumbnail.url,
        alt: post.thumbnail.alternativeText,
      },
    };
  });

  return formattedPosts.reverse();
};

export default getAllPosts;
