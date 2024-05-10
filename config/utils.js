const path = require("path");
const slugify = require("slugify");

const getAllUniqueKeyValues = (items, key) => {
  // récupération des données de la collection
  let values = items.map((item) => item[key] ?? []);
  // création d'un nouveau tableau à une dimension
  values = values.flat();
  // élimination des doublons
  values = [...new Set(values)];
  // ordonner les catégories par ordre alphabétique
  values = values.sort((key1, key2) =>
    key1.localeCompare(key2, "en", { sensitivity: "base" })
  );
  return values;
};

/** Convertir un string en slug */
const slugifyString = (str) => {
  return slugify(str, {
    replacement: "-",
    remove: /[#,&,+()$~%.'":*?<>{}]/g,
    lower: true,
  });
};

/**
 * Transformer un objet en attribut html
 * @param {*} attributeMap
 * @returns
 */
const stringifyAttributes = (attributeMap) => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      return typeof value === "undefined" ? "" : `${attribute}="${value}"`;
    })
    .join(" ");
};

/**
 * Extraire un chemin sans le répertoire de base
 * @param {*} str
 * @returns
 */
const removeBaseDirectory = (str) => str.substring(str.indexOf(path.sep));

module.exports = {
  getAllUniqueKeyValues,
  slugifyString,
  stringifyAttributes,
  removeBaseDirectory,
};
