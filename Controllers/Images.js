const Clarifai = require("clarifai");
const { response } = require("express");
require("dotenv").config();

// process.env.API_KEY
const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const handleApiCall = (req, res) => {
  console.log("handleApiCall")
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      console.log(data);
      response.json({data});
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({err})
    });
};

const handleImages = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).send("unable to get entries"));
};

module.exports = {
  handleImages: handleImages,
  handleApiCall: handleApiCall,
};
