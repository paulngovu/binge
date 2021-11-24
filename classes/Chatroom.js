import Message from './Message'

class Chatroom{
    #user;
    #recipe;
    #userMessages = [];
    #recipeMessages = [];
    #triggers = [];
    #responses = [];

    #alternatives = [
        "Try again with a different message",
        "Try asking me for more details about my recipe",
        "Try asking me about my ingredients",
        "Try asking me about my meal type",
        "Try asking me about my cuisine type",
        "Try asking me about my dish type",
        "Try asking me about my calories",
        "Try asking me about any allergy concerns",
        "Try saying hi!"
    ];

    constructor(user, recipe){
        this.#user = user;
        this.#recipe = recipe
        //this.#userMessages = load from database
        //this.#recipeMessages = load from database

        this.#userMessages = [];
        this.#recipeMessages = [];

        this.#triggers = [
            // 0
                ["hi", "hello"],
            // 1
                ["recipe", "link", "url", "detail"],
            // 2
                ["ingredients"],
            // 3
                ["calorie"],
            // 4
                ["allergy", "allergies", "caution"],
            // 5
                ["meal type"],
            // 6
                ["cuisine type"],
            // 7
                ["dish type"]
        ]

        this.#responses = [
            // 0
                "Hello! My name is " + this.#recipe.name + ".",
            // 1
                "You can find the full recipe here: " + this.#recipe.url,
            // 2
                "Here are a list of ingrients that you will need for this dish: \n" + this.#arrToString(this.#recipe.ingredients),
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

        if(response == ""){
            // pick a random string from the alternatives field
            response = this.#alternatives[Math.floor(Math.random() * this.#alternatives.length)]
        }

        var m = new Message(response.trim());
        this.#recipeMessages.push(m);
        // todo upload m to database
    }

}

export default Chatroom;