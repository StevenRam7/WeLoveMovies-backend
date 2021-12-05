const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const config = {
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
};
const addCritic= mapProperties(config);
const addCriticArray= (array)=>{
    return array.map((item)=>addCritic(item));
};

function update(review_id, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*");
}

function readUpdatedReview(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id })
    .first()
    .then((result) => {
      const updatedReview = addCritic(result);
      return {...updatedReview, critic_id: updatedReview.critic.critic_id}
    });
}

function read(reviewId) {
   return knex("reviews as r")
  .select("*")
  .where({ review_id: reviewId })
  .first()
}

function destroy(reviewId){
  return knex("reviews")
  .where({ review_id: reviewId })
  .del();
}

module.exports = {
    read,
   update,
  readUpdatedReview,
   delete: destroy
 }