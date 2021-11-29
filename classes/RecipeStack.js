import Recipe from '../edamamAPI/Recipe'

class RecipeStack {
    #maxSize = 20;
    #recipeArr = [];
    #user;

    constructor(user){
        this.#user = user;
    }

    getTopRecipe(){
        const count = this.#recipeArr.length;
        if (count === 0) return null;
        return this.#recipeArr[count-1];            // return last index
    }

    // the matches stored locally are now unused
    acceptTopRecipe(){
        if (this.#recipeArr.length > 0) {
            const rec = this.#recipeArr.pop();
            this.#user.addMatch(rec);
        }
    }

    rejectTopRecipe(){
        if (this.#recipeArr.length > 0) this.#recipeArr.pop();
    }

    stackEmpty(){
        return (this.#recipeArr.length === 0);
    }

    // key function - Call when the RecipeStack is empty to query for more data.
    // This function loads 20 new food items from the Edamam API by using the user’s 
    // filter preferences and calling queryAPI() from the Recipe class.
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