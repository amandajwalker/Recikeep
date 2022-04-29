const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const RecipeModel = require("../models/Recipe.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// my profile
router.get("/profile", (req, res, next)=>{
  RecipeModel.find()
    .then((recipesArray)=> {
      res.render("profile.hbs", {"myRecipesArray": recipesArray})
    })

    .catch((err)=>{
      console.log(err);
    })


  // res.render("profile.hbs",);
})




module.exports = router;
