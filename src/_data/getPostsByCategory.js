import lodash from "lodash";
import { getAllUniqueKeyValues, slugifyString } from "../../config/utils.js";
import getAllPosts from "./getAllPosts.js";

const getPostsByCategory = async () => {
  const allPosts = await getAllPosts();

  const allUniqueCategories = getAllUniqueKeyValues(allPosts, "categories");

  const blogPostsByCategory = [];

  allUniqueCategories.forEach((category) => {
    const categoryPosts = allPosts.filter((post) =>
      post.categories?.includes(category)
    );

    const chunkedCategoryPosts = lodash.chunk(
      categoryPosts,
      categoryPosts.length
    );

    const categorySlug = slugifyString(category);

    const pageHrefs = chunkedCategoryPosts.map((_) => {
      return `/tags/${categorySlug}/`;
    });

    chunkedCategoryPosts.forEach((posts, index) => {
      blogPostsByCategory.push({
        title: category,
        href: pageHrefs[index],
        hrefs: {
          all: pageHrefs,
        },
        posts,
      });
    });
  });

  return blogPostsByCategory.sort(
    (category1, category2) => category2.posts.length - category1.posts.length
  );
};

export default getPostsByCategory;
