const qs = require("qs");
const EleventyFetch = require("@11ty/eleventy-fetch");
const metadata = require("./metadata");

require("dotenv").config();

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
    duration: "1d",
    type: "json",
  });

  const formattedPosts = posts.data.map((post) => {
    const categoryNames = post.attributes.categories.data.reduce(
      (acc, item) => {
        return acc.concat(Object.values(item.attributes));
      },
      []
    );

    return {
      id: post.id,
      title: post.attributes.title,
      description: post.attributes.description,
      content: post.attributes.content,
      isInteresting: post.attributes.isInteresting,
      date: {
        createdAt: post.attributes.createdAt,
        updatedAt: post.attributes.updatedAt,
      },
      slug: post.attributes.slug,
      categories: categoryNames,
      thumbnail: {
        url: post.attributes.thumbnail.data.attributes.url,
        alt: post.attributes.thumbnail.data.attributes.alternativeText,
      },
    };
  });

  return formattedPosts.reverse();
};

module.exports = getAllPosts;
