class Filter{
    #query = "";
    #mealType = "";
    #cuisineType = "";
    #dishType = "";

    #randomChar() {
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
            this.query = randomChar();
        }
    }


    // to test the API, enter your app key and id
    queryAPI(){
        var app_key = "";
        var app_id = "";

        var url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + this.query + "&app_id=" + app_id + "&app_key=" + app_key + "&random=true";
        if(this.mealType != ""){
            url += "&mealType=" + this.mealType;
        }
        if(this.cuisineType != ""){
            url += "&cuisineType=" + this.cuisineType;
        }
        if(this.dishType != ""){
            url += "&dishType=" + this.dishType;
        }

        console.log(url);

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
}

export default Filter;