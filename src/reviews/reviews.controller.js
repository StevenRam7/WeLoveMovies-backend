const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

const config = {
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
};
const addCritic= mapProperties(config);
const addCriticArray= (array)=>{
    return array.map((item)=>addCritic(item));
};

//middleware
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

function hasContent(req, res, next){
    console.log(req.body.data);
    const {data: {content}={}}= req.body;
    console.log(content);
    if(content){
        res.locals.content=content;
        return next();
    }else{
        next({status: 400, message:`Must include content`});
    }
}

//handlers
async function update(req, res, next) {
    const newReview = req.body.data;
    const { review_id } = res.locals.reviewX;
    await service.update(review_id, newReview);
    const data = await service.readUpdatedReview(review_id)
    res.json({ data });
}

async function destroy(req, res, next) {
  res.status(204).json({ data: await service.delete(req.params.reviewId) })
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), destroy]
}