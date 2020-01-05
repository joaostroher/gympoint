export default async (req, res, next) => {
  const limit = 10;
  const { page } = req.query;
  const pagination = page
    ? {
        limit,
        offset: (page - 1) * limit,
      }
    : {};

  req.page = page;
  req.pagination = pagination;

  next();
};
