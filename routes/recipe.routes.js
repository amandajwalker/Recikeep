const router = require("express").Router();
const RecipesModel = require("../models/Recipe.model");


//send create recipe form 
router.get('/create', (req, res)=>{
res.render('recipe/create.hbs')
})


//receive create recipe form 

router.post('/create', (req, res)=>{
var name = req.body.name;
var imageUrl = req.body.image;
var description = req.body.description;
var prepTime = req.body.prepTime;
var cookTime = req.body.cookTime;
var ingredients = req.body.ingredients;
var instructions = req.body.instructions;

RecipesModel.create({
    "name": name,
    "imageUrl": imageUrl,
    "description": description,
    "prepTime": Number(prepTime),
    "cookTime": Number(cookTime),
    "ingredients": [ingredients],
    "instructions": [instructions] 
    })
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err=>{
        console.log(err);
    })
})






module.exports = router;