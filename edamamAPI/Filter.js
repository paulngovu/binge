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
    query = "";
    mealType = [];
    cuisineType = [];
    dishType = [];

    randomChar() {
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // enter empty string if you don't want to filter a category
    constructor(query, mealType, cuisineType, dishType){
        this.mealType = mealType;
        this.cuisineType = cuisineType;
        this.dishType = dishType;

        if (query != ""){
            this.query = query;
        }else{
            this.query = this.randomChar();
        }
    }

    // to test the API, enter your app key and id
    async queryAPI(){
        var app_key = "867eb2cc967aec978fb2d65c68077b95";
        var app_id = "7bb6a23d";

        var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + this.query + "&app_id=" + app_id + "&app_key=" + app_key + "&random=true";
        
        for (var i = 0; i < this.mealType.length; i++){
            url += "&mealType=" + this.mealType[i];
        }
        for (var i = 0; i < this.cuisineType.length; i++){
            url += "&cuisineType=" + this.cuisineType[i];
        }
        for (var i = 0; i < this.dishType.length; i++){
            url += "&dishType=" + this.dishType[i];
        }

        console.log(url);

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