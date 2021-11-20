import Filter from '../edamamAPI/Filter'
import Recipe from '../edamamAPI/Recipe'

class User {
    #name;
    #filter;
    #matches = [];
    
    // #chats;

    constructor(name, filter, matches){
        this.#name = name;
        this.#filter = filter;
        this.#matches = matches;
    }

    getName(){
        return this.#name;
    }

    setName(){
        return this.#name;
    }

    updateFilter(query, mealType, cuisineType, dishType){
        const newFilter = new Filter(query, mealType, cuisineType, dishType);
        this.#filter = newFilter;
    }

    getFilter(){
        return this.#filter;
    }

    addMatch(m) {
        this.#matches.push(m);
    }

    getMatches(){
        return this.#matches;
    }    

    removeMatch(i){
        if ((i < this.#matches.length) && (i >= 0)){
            this.#matches.splice(i, 1);
        }
    }
}

export default User;