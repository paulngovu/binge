import Filter from '../edamamAPI/Filter'

class User {
    #name;
    #filter;
    #matches = [];

    constructor(name, filter, matches){
        this.#name = name;
        this.#filter = filter;
        this.#matches = matches;
    }

    getName(){
        return this.#name;
    }

    setName(name){
        this.#name = name;
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

}

export default User;