const router = require("express").Router();
const RecipesModel = require("../models/Recipe.model");
const User = require("../models/User.model");


//send create recipe form 
router.get('/create', (req, res)=>{
res.render('recipe/create.hbs')
})


//receive create recipe form 

router.post('/create', (req, res)=>{
var name = req.body.name;
var imageUrl = req.body.imageUrl;
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
    .then((newRecipe)=>{
        User.findByIdAndUpdate(req.session.user._id,{
            $push: {
                recipes: newRecipe._id
            }
            
        })
        .then(()=>{
           res.redirect("/profile")   
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/:recipeId", (req, res)=>{
    const recipeId = req.params.recipeId;
    RecipesModel.findById(recipeId)
    .then((foundRecipe)=>{
        res.render("recipe/individual-recipe.hbs", foundRecipe)
    })
    .catch(err=>{
        console.log(err);
    })
})


router.get("/:recipeId/delete", (req, res)=>{
    const recipeId = req.params.recipeId;
    RecipesModel.findByIdAndDelete(recipeId)
    .then(()=>{
        User.findByIdAndUpdate(req.session.user._id, {
            $pull: {
                recipes: recipeId
            }

        })
        .then(()=>{
            res.redirect("/profile")
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/:recipeId/edit", (req, res)=>{
    // res.render("recipe/edit")
    const recipeId = req.params.recipeId;
    RecipesModel.findById(recipeId)
        .then((foundRecipe)=>{
            res.render("recipe/edit.hbs", foundRecipe)
        })
        .catch(err=>{
            console.log(err);
        })
})

router.post("/:recipeId/edit", (req, res)=>{
    const recipeId = req.params.recipeId;
    var name = req.body.name;
    var imageUrl = req.body.imageUrl;
    var description = req.body.description;
    var prepTime = req.body.prepTime;
    var cookTime = req.body.cookTime;
    var ingredients = req.body.ingredients;
    var instructions = req.body.instructions;
    RecipesModel.findByIdAndUpdate(recipeId, {
        
            "name": name,
            "imageUrl": imageUrl,
            "description": description,
            "prepTime": Number(prepTime),
            "cookTime": Number(cookTime),
            "ingredients": [ingredients],
            "instructions": [instructions] 
    })   
    .then(()=>{
        res.redirect(`/recipe/${recipeId}`)
    })
    .catch(err=>{
        console.log(err);
    })

})


module.exports = router;