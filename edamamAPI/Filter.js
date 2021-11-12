/* Use: example

const filter = new Filter("", ["Lunch", "Dinner"], ["Chinese"], []);

  filter.queryAPI().then((json) => {
    console.log(json);
    const arr = Recipe.parseJson(json);
    for(var i = 0; i < arr.length; i++){
      arr[i].dumpRecipe();
    }
    console.log("done");
  });

*/


class Filter{
    #query = "";
    #mealType = [];
    #cuisineType = [];
    #dishType = [];

    #randomChar() {
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // enter empty string if you don't want to filter a category
    constructor(query, mealType, cuisineType, dishType){
        this.#mealType = mealType;
        this.#cuisineType = cuisineType;
        this.#dishType = dishType;

        // since the query field is necessary for every API call, we generate
        // a random letter as a query if it is not specified
        if (query != ""){
            this.#query = query;
        }else{
            this.#query = this.#randomChar();
        }
    }

    getQuery(){
        return this.#query;
    }

    getMealType(){
        return this.#mealType;
    }

    getCuisineType(){
        return this.#cuisineType;
    }

    getDishType(){
        return this.#dishType;
    }

    // helper function that formats the recipe search API url
    // TODO: current bug -- if the Filter fields contain spaces, need to convert the spaces into "%20" instead
    generateUrl(app_key, app_id){
        var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + this.#query + "&app_id=" + app_id + "&app_key=" + app_key + "&random=true";
        
        for (var i = 0; i < this.#mealType.length; i++){
            url += "&mealType=" + this.#mealType[i];
        }
        for (var i = 0; i < this.#cuisineType.length; i++){
            url += "&cuisineType=" + this.#cuisineType[i];
        }
        for (var i = 0; i < this.#dishType.length; i++){
            url += "&dishType=" + this.#dishType[i];
        }

        return url;
    }

    // This function acts as a framework to fall the recipe search API. Since this call 
    // contains an asynchronous API call, the function itself must also be asynchronous.
    // It takes no parameters since it uses the class fields of this class to adjust the
    // API query.
    // @return   json object containing the API call data (or null if the call failed)
    async queryAPI(){
        var app_key = "867eb2cc967aec978fb2d65c68077b95";
        var app_id = "7bb6a23d";

        var url = this.generateUrl(app_key, app_id);

        //console.log(url);

        try {
            const res = await fetch(url);
            const result = await res.json();
            return result;
        }
        catch (error) {
            console.log("error calling api");
            return null;
        }
    }
}

export default Filter;