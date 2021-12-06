const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const film = await service.read(req.params.movieId);
  if (film) {
    res.locals.film = film;
    return next()
  }
  next({
    status: 404,
    message: "Movie cannot be found."
  })
} 

async function list(req, res, next) {
    res.json({ data: await service.list(req.query.is_showing) })
}

async function theaterList(req, res, next) {
    res.json({ data: await service.theaterList(req.params.movieId) })
}

async function reviewList(req, res, next) {
    res.json({ data: await service.reviewList(req.params.movieId) })
}

async function read(req, res, next) {
  res.json({ data: res.locals.film })
}

module.exports = {
  list,
  theaterList,
  reviewList,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)]
}