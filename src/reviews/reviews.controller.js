const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const reviewX = await service.read(req.params.reviewId);
  if (reviewX) {
    res.locals.reviewX = reviewX;
    return next()
  }
  next({
    status: 404,
    message: "Review cannot be found."
  })
} 

async function update(req, res, next) {
  await service.update(req.body.data, req.params.reviewId)
  res.json({ data: await 
            service.read(req.params.reviewId)
             })
}

async function destroy(req, res, next) {
  res.status(204).json({ data: await service.delete(req.params.reviewId) })
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), destroy]
}