import Message from './Message'

class Chatroom{
    #user;
    #recipe;
    #userMessages = [];
    #recipeMessages = [];
    #triggers = [];
    #responses = [];

    constructor(user, recipe){
        this.#user = user;
        this.#recipe = recipe
        //this.#userMessages = load from database
        //this.#recipeMessages = load from database

        this.#userMessages = [];
        this.#recipeMessages = [];

        this.#triggers = [
            // 0
                ["Hello!"],
            // 1
                ["What is your recipe URL?"],
            // 2
                ["What are your ingredients?"],
            // 3
                ["How many calories do you contain?"],
            // 4
                ["Are there any cautions I should be aware of?"],
            // 5
                ["What is your meal type?"],
            // 6
                ["What is your cuisine type?"],
            // 7
                ["What is your dish type?"]
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
        for (var i = 0; i < arr.length; i++){
            s += arr[i] + "\n"; 
        }
        return s.trim();
    }

    getUserMessages(){
        return this.#userMessages;
    }

    getRecipeMessages(){
        return this.#recipeMessages;
    }

    getTriggers(){
        return this.#triggers;
    }

    userSendMessage(text){
        const m = new Message(text);
        this.#userMessages.push(m);

        // upload m to database

        this.#recipeResponseMessage(m);
    }

    #recipeResponseHelper(text){
        var response = "";
        for (var i = 0; i < this.#triggers.length; i++){
            for (var j = 0; j < this.#triggers[i].length; j++){
                if(text.includes(this.#triggers[i][j])){
                    response += this.#responses[i] + "\n";
                    break;  // break to avoid sending the same response twice
                }
            }
        }
        return response;
    }

    // input: Message object
    #recipeResponseMessage(userMessage){
        const input = userMessage.getText();

        // only keep word characters, spaces and digits
        // also convert all characters to lower case
        let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

        var response = this.#recipeResponseHelper(text);

        var m = new Message(response.trim());
        this.#recipeMessages.push(m);
        // todo upload m to database
    }

}

export default Chatroom;