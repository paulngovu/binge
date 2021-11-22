import Message from './Message'
import { User } from 'grommet-icons';

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
                ["recipe", "link", "url", "detail"],
            // 1
                ["calorie"],
            // 2
                ["allergy", "allergies", "caution"]
            // 3
    
            // 4
        ]

        this.#responses = [
            // 0
                "You can find the full recipe here: " + this.#recipe.url,
            // 1
                "This recipe is about " + this.#recipe.url + "calories per serving",
            // 2
                "Here are some caution tags for this recipe: " + this.#cautionsToString()
            // 3
    
            // 4
        ]
    }

    #cautionsToString(){
        var s = "";
        for (var i = 0; i < this.#recipe.cautions; i++){
            s += this.#recipe.cautions[i] + "\n"; 
        }
        return s;
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
        for (var i = 0; i < this.#triggers.length; i++){
            for (var j = 0; j < this.#triggers[i].length; j++){
                if(text.includes(this.#triggers[i][j])){
                    return this.#responses[i];
                }
            }
        }
    }

    // input: Message object
    #recipeResponseMessage(userMessage){
        const input = userMessage.getText();

        // only keep word characters, spaces and digits
        // also convert all characters to lower case
        let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

        var response = this.#recipeResponseHelper(text);
        var m = new Message(response);
        this.#recipeMessages.push(m);
        // todo upload m to database
    }

}

export default Chatroom;