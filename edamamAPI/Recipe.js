class Recipe {
    constructor(name, image, ingredients, cuisineType, mealType, dishType, id, calories, cautions){
        this.name = name;
        this.image = image;        
        this.ingredients = ingredients;
        this.cuisineType = cuisineType;
        this.mealType = mealType;
        this.dishType = dishType;
        this.id = id;
        this.calories = calories;
        this.cautions = cautions;
    }        

    // This function takes in a json Object containing the data returned from a
    // recipe search API call. This function parses that data and creates Recipe
    // objects using it. The maximum number of hits per API call is 20
    // @param json - Object containing the data from the recipe search API
    // @return   array of Recipe objects
    static parseJson(json){
        var recipeObj = [];
        var recipes = json.hits;
        if (!recipes) {
            return recipeObj;
        }

        for (var i = 0; i < json.hits.length; i++){
            recipeObj.push(Recipe.#createRecipe(json.hits[i]));
        }
        return recipeObj;
    }

    // function to get the recipe id from the uri field returned by the recipe api
    // the id comes at the end of the uri following the tag "#recipe_"
    static #getIDfromUri(uri){
        var arr = uri.split("#recipe_");
        if(arr.length > 1){
            return arr[1];
        }else{
            return "";
        }
    }

    // remove and place in constructor
    static #createRecipe(json){
        var r = new Recipe(json.recipe.label, 
            json.recipe.image, 
            json.recipe.ingredientLines, 
            json.recipe.cuisineType,
            json.recipe.mealType, 
            json.recipe.dishType, 
            Recipe.#getIDfromUri(json.recipe.uri), 
            (json.recipe.calories / json.recipe.yield),
            json.recipe.cautions);

        return r;
    }

    // Test function
    static testParsing(){
        const customData = require('./recipeApiExample.json');
        var arr = this.parseJson(customData);
        console.log("printing objects");
        for (var i = 0; i < arr.length; i++){
            arr[i].dumpRecipe();
        }
    }

    // dump function to print out the contents of the Recipe to console
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
}

export default Recipe;
