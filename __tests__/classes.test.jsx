import RecipeStack from '../classes/RecipeStack'
import User from '../classes/User'
import Filter from '../edamamAPI/Filter'
import Message from '../classes/Message'
import Chatroom from '../classes/Chatroom'
import Recipe from '../edamamAPI/Recipe'

it('fast class test', () => {
    const filter = new Filter("", [], [], []);

    const tempUser = new User("John", filter, []);
    const tempStack = new RecipeStack(tempUser);

    expect(tempStack.stackEmpty()).toBe(true);
});


it('RecipeStack test', async () => {
    const filter = new Filter("", [], [], []);

    const tempUser = new User("John", filter, []);
    const tempStack = new RecipeStack(tempUser);

    const mockJson = require("../edamamAPI/recipeApiExample.json");
    let spy = jest.spyOn(filter, 'queryAPI').mockImplementation(() => mockJson);

    expect(tempStack.stackEmpty()).toBe(true);
    await tempStack.refreshStack();
    expect(tempStack.stackEmpty()).toBe(false);

    for (var i = 0; i < 10; i++){
        tempStack.acceptTopRecipe();
        tempStack.rejectTopRecipe();
    }

    expect(tempStack.stackEmpty()).toBe(true);
    expect(tempUser.getMatches().length).toBe(10);
  });


it('Message test', () => {
    const m = new Message("hi");

    expect(m.getText()).toBe("hi");
});

it('Chatroom test', () => {
    const filter = new Filter("", [], [], []);
    const tempUser = new User("John", filter, []);

    const json = require("../edamamAPI/recipeApiExample.json");
    const recipearr = Recipe.parseJson(json);

    const c = new Chatroom(tempUser, recipearr[0]);

    expect(c.getUserMessages().length).toBe(0);
    expect(c.getRecipeMessages().length).toBe(0);

    c.userSendMessage("what are the details?");

    expect(c.getUserMessages().length).toBe(1);
    expect(c.getUserMessages()[0].getText()).toBe("what are the details?");

    expect(c.getRecipeMessages().length).toBe(1);
    expect(c.getRecipeMessages()[0].getText()).toBe("You can find the full recipe here: http://www.seriouseats.com/recipes/2011/10/applejack-rabbit-classic-apple-brandy-cocktail-pdt-recipe.html");
});