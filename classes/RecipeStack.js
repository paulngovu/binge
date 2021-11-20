import Recipe from '../edamamAPI/Recipe'
import Filter from '../edamamAPI/Filter'
import User from './User'

class RecipeStack {
    #maxSize = 20;
    #recipeArr = [];
    #user;

    constructor(user){
        this.#user = user;
    }

    getTopRecipe(){
        var count = this.#recipeArr.length;
        if (count == 0) return null;
        return this.#recipeArr[count-1];            // return last index
    }

    // takes a user parameter and adds the recipe to the users match list
    // todo after making User class
    acceptTopRecipe(){
        var rec = this.#recipeArr.pop();
        this.#user.addMatch(rec);
    }

    rejectTopRecipe(){
        if (this.#recipeArr.length > 0) this.#recipeArr.pop();
    }

    stackEmpty(){
        return (this.#recipeArr.length == 0);
    }


    // takes array of Recipe objects and adds them to the array
    #addRecipes(arr){
        arr.forEach(element => {
            if(this.#recipeArr.length < this.#maxSize){
                this.#recipeArr.push(element);
            }
        });
    }

    async refreshStack(){
        try {
            const json = await this.#user.getFilter().queryAPI();
            this.#recipeArr = Recipe.parseJson(json);
        }
        catch (error) {
            console.log("error calling api");
            return null;
        }
    }


    clearRecipes(){
        this.#recipeArr = [];
    }


}

export default RecipeStack;