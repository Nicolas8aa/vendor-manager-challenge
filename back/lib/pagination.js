/**
 * Function to get limit and offset for pagination
 * @param {*} page  page number
 * @param {*} size  number of items per page
 * @returns  { limit, offset } limit: number of items per page, offset: number of items to skip
 */

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

/**
 * Function to get data for pagination
 * @param {*} data data to be paged findAndCountAll result
 * @param {*} page current page
 * @param {*} limit  number of items per page
 * @returns `{ totalItems, results, totalPages, currentPage }`
 * - totalItems: total number of items,
 * - results: items on the current page,
 * - totalPages: total number of pages,
 * - currentPage: current page
 */

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, results: rows, totalPages, currentPage };
};

module.exports = {
  getPagination,
  getPagingData,
};
