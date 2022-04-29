const router = require("express").Router();
const User = require("../models/User.model");
const RecipeModel = require("../models/Recipe.model")

/* GET home page */
router.get("/", (req, res, next) => {
  // res.render("index");
  RecipeModel.find()
  .then((recipesArray)=> {
    res.render("index.hbs", {"myRecipesArray": recipesArray})
  })

  .catch((err)=>{
    console.log(err);
  })
});


// my profile
router.get("/profile", (req, res, next)=>{
  // RecipeModel.find()
  //   .then((recipesArray)=> {
  //     res.render("profile.hbs", {"myRecipesArray": recipesArray})
  //   })

  //   .catch((err)=>{
  //     console.log(err);
  //   })
    User.findById(req.session.user._id)
    .populate("recipes")
    .then((foundUser)=>{
      res.render("profile.hbs", foundUser)
    })
    .catch((err) => {
      console.log(err);
    })
  // res.render("profile.hbs",);
})








module.exports = router;
