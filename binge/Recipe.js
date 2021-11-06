class Recipe {
    constructor(){
        this.name = "";
        this.image = null;
        this.description = "";
        this.id = -1;
        this.instructions = "";
        this.ingredients = [];
        this.cuisineType = "";
        this.mealType = "";
    }

    // to test the API, enter your app key and id
    static queryAPI(){
        var query = "b";
        var app_key = "";
        var app_id = "";

        var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + query + "&app_id=7" + app_id + "&app_key=" + app_key;

        var jsonresponse = null;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    jsonresponse = result;
                    this.parseJson(jsonresponse);
                },
                (error) => {
                    console.log("error calling api");
                }
            )
        return jsonresponse;
    }

    // test parsing
    static parseJson(json){
        var recipes = json.hits;
        console.log(recipes);

        for (var i = 0; i < 20; i++){
            console.log(json.hits[i].recipe.label);
        }
    }

    static testParsing(){
        const customData = require('../recipeApiExample.json');
        this.parseJson(customData);
    }


}

export default Recipe;
