import Filter from '../edamamAPI/Filter';
import Recipe from '../edamamAPI/Recipe';

describe('Edamam classes', () => {
  it('Create empty Filter', () => {
    const filter = new Filter("", [], [], []);
    expect(filter.getQuery().length).toBe(0);
    expect(filter.getMealType().length).toBe(0);
    expect(filter.getCuisineType().length).toBe(0);
    expect(filter.getDishType().length).toBe(0);
  })

  it('Create Filter with nonempty fields', () => {
    const filter = new Filter("steak", ["Breakfast", "Lunch"], ["American", "Asian"], ["Main course"]);
    expect(filter.getQuery()).toBe("steak");
    expect(filter.getMealType()).toStrictEqual(["Breakfast", "Lunch"]);
    expect(filter.getCuisineType()).toStrictEqual(["American", "Asian"]);
    expect(filter.getDishType()).toStrictEqual(["Main course"]);
  })


  it('Check the generated url of a Filter with empty fields', () => {
    const filter = new Filter("", [], [], []);
    const url = filter.generateUrl("key", "id");

    // skip the query field since we just expect it to be a single random char
    expect(url.substring(0, 52)).toBe("https://api.edamam.com/api/recipes/v2?type=public&q=");
    expect(url.substring(53)).toBe("&app_id=id&app_key=key&random=true");
  })

  it('Check the generated url of a Filter with nonempty fields', () => {
    const filter = new Filter("steak", ["Dinner", "Lunch"], ["American", "Asian"], ["Sandwiches", "Salad"]);

    var targetURL = "https://api.edamam.com/api/recipes/v2?type=public&q=steak&app_id=id&app_key=key&random=true";
    targetURL += "&mealType=Dinner&mealType=Lunch";
    targetURL += "&cuisineType=American&cuisineType=Asian";
    targetURL += "&dishType=Sandwiches&dishType=Salad";

    expect(filter.generateUrl("key", "id")).toBe(targetURL);
  })

  it('Check the generated url of a Filter with multi-word fields', () => {
    const filter = new Filter("chicken soup", ["Lunch"], ["American"], ["Main Course"]);

    var targetURL = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20soup&app_id=id&app_key=key&random=true";
    targetURL += "&mealType=Lunch";
    targetURL += "&cuisineType=American";
    targetURL += "&dishType=Main%20Course";

    expect(filter.generateUrl("key", "id")).toBe(targetURL);
  })

  it('Check the return of testParsing function on a test file', () => {
    const json = require("../edamamAPI/recipeApiExample.json");
    const arr = Recipe.parseJson(json);

    expect(arr.length).toBe(20);
    expect(arr[0].name).toBe("Applejack Rabbit Recipe");
    expect(arr[0].id).toBe("5f9c90e934335cecb079e7155f465cda");
  })

// removed for now
/*
it('Check queryUrl function with empty Filter', () => {
    const filter = new Filter("", [], [], []);

    filter.queryAPI().then((json) => {
        const arr = Recipe.parseJson(json);
        expect(arr.length).toBe(20);
      });
  })

  it('Check queryUrl function with nonempty Filter', () => {
    const filter = new Filter("steak", ["Dinner"], ["American"], ["Sandwiches"]);

    filter.queryAPI().then((json) => {
        const arr = Recipe.parseJson(json);
        expect(arr.length).toBe(20);
      });
  })
*/
});
