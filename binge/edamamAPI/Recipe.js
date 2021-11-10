class Recipe {
    constructor(){
        this.name = "";
        this.image = null;
        this.id = "";
        this.ingredients = [];
        this.cuisineType = [];
        this.mealType = [];
        this.dishType = [];
        this.calories = -1;         // calories per serving
        this.cautions = [];
    }

    // function for testing
    dumpRecipe(){
        console.log("name: " + this.name);
        console.log("image: " + this.image);
        console.log("ingredients: ");
        for (var i = 0; i < this.ingredients.length; i++){
            console.log(i + "\t" + this.ingredients[i]);
        }

        console.log("cuisine type: ");
        for (var i = 0; i < this.cuisineType.length; i++){
            console.log(i + "\t" + this.cuisineType[i]);
        }

        console.log("meal type: ");
        for (var i = 0; i < this.mealType.length; i++){
            console.log(i + "\t" + this.mealType[i]);
        }

        console.log("dish type: ");
        for (var i = 0; i < this.dishType.length; i++){
            console.log(i + "\t" + this.dishType[i]);
        }

        console.log("id: " + this.id);
        console.log("calories: " + this.calories);

        console.log("cautions: ");
        for (var i = 0; i < this.cautions.length; i++){
            console.log(i + "\t" + this.cautions[i]);
        }
    }

    // test parsing
    static parseJson(json){
        var recipeObj = [];
        var recipes = json.hits;
        console.log(recipes);

        for (var i = 0; i < 20; i++){
            console.log(json.hits[i].recipe.label);
            recipeObj.push(this.createRecipe(json.hits[i]));
        }
        return recipeObj;
    }

    // function to get the recipe id from the uri field returned by the recipe api
    // the id comes at the end of the uri following the tag "#recipe_"
    static getIDfromUri(uri){
        var arr = uri.split("#recipe_");
        if(arr.length > 1){
            return arr[1];
        }else{
            return "";
        }
    }

    static createRecipe(json){
        var r = new Recipe();
        r.name = json.recipe.label;
        r.image = json.recipe.image;        // eventually change this to image object instead of url
        r.ingredients = json.recipe.ingredientLines;
        r.cuisineType = json.recipe.cuisineType;
        r.mealType = json.recipe.mealType;
        r.dishType = json.recipe.dishType;
        r.id = Recipe.getIDfromUri(json.recipe.uri);
        r.calories = json.recipe.calories / json.recipe.yield;
        r.cautions = json.recipe.cautions;

        return r;
    }

    static testParsing(){
        const customData = require('./recipeApiExample.json');
        var arr = this.parseJson(customData);
        console.log("printing objects");
        for (var i = 0; i < arr.length; i++){
            arr[i].dumpRecipe();
        }
    }
}

export default Recipe;
