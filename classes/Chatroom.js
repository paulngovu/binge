class Chatroom{
    #recipe;
    #triggers = [];
    #responses = [];

    constructor(recipe){
        this.#recipe = recipe

        this.#triggers = [
            // 0
                "Hello!",
            // 1
                "What is your recipe URL?",
            // 2
                "What are your ingredients?",
            // 3
                "How many calories do you contain?",
            // 4
                "Are there any cautions I should be aware of?",
            // 5
                "What is your meal type?",
            // 6
                "What is your cuisine type?",
            // 7
                "What is your dish type?"
        ]

        this.#responses = [
            // 0
                "Hello! My name is " + this.#recipe.name + ".",
            // 1
                "You can find the full recipe here: " + this.#recipe.url,
            // 2
                "Here are a list of ingredients that you will need for this dish: \n" + this.#arrToString(this.#recipe.ingredients),
            // 3
                "This recipe is about " + this.#recipe.calories + " calories per serving.", 
            // 4
                "Here are some caution tags for this recipe: \n" + this.#arrToString(this.#recipe.cautions),
            // 5
                "This recipe is labeled as a " + this.#arrToString(this.#recipe.mealType) + " meal.",
            // 6
                "This recipe is labeled as a " + this.#arrToString(this.#recipe.cuisineType) + " dish.",
            // 7
                "This recipe is labeled as a " + this.#arrToString(this.#recipe.dishType) + " dish."
        ]
    }

    #arrToString(arr){
        var s = "";
            
        if (arr.length == 0) return s;

        s = arr[0];
        for (var i = 1; i < arr.length; i++){
            s += ", " + arr[i]; 
        }
        return s.trim();
    }

    // This function is a helper that looks for trigger phrases in the user’s message and returns the appropriate recipe response string.
	// @param 	text: string - message string sent by user
    // @return	string: message to be sent by recipe in response
    recipeResponse(text){
        for (var i = 0; i < this.#triggers.length; i++){
            if(text == this.#triggers[i]){
                return this.#responses[i];
            }
            
        }
        return "Try sending another message";
    }

}

export default Chatroom;