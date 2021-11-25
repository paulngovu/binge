import RecipeStack from '../classes/RecipeStack'
import User from '../classes/User'
import Filter from '../edamamAPI/Filter'
import Message from '../classes/Message'
import Chatroom from '../classes/Chatroom'
import Recipe from '../edamamAPI/Recipe'

describe('Classes', () => {
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

    it('Chatroom detail message test', () => {
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

    it('Chatroom greeting test', () => {
        const filter = new Filter("", [], [], []);
        const tempUser = new User("John", filter, []);

        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(tempUser, recipearr[0]);

        expect(c.getUserMessages().length).toBe(0);
        expect(c.getRecipeMessages().length).toBe(0);

        c.userSendMessage("Hi HELLO");

        expect(c.getUserMessages().length).toBe(1);
        expect(c.getUserMessages()[0].getText()).toBe("Hi HELLO");

        expect(c.getRecipeMessages().length).toBe(1);
        expect(c.getRecipeMessages()[0].getText()).toBe("Hello! My name is Applejack Rabbit Recipe.");
    });

    it('Chatroom ingredients test', () => {
        const filter = new Filter("", [], [], []);
        const tempUser = new User("John", filter, []);

        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(tempUser, recipearr[0]);

        expect(c.getUserMessages().length).toBe(0);
        expect(c.getRecipeMessages().length).toBe(0);

        c.userSendMessage("what ingredients do I need?");

        expect(c.getUserMessages().length).toBe(1);
        expect(c.getUserMessages()[0].getText()).toBe("what ingredients do I need?");

        expect(c.getRecipeMessages().length).toBe(1);

        var response = "Here are a list of ingrients that you will need for this dish: \n";
        response += "2 ounces Laird's Bonded Apple Brandy\n";
        response += "3/4 ounce fresh lemon juice\n";
        response += "3/4 ounce fresh orange juice\n";
        response += "1/2 ounce Deep Mountain Grade B Maple Syrup";

        expect(c.getRecipeMessages()[0].getText()).toBe(response);
    });

    it('Chatroom calorie test', () => {
        const filter = new Filter("", [], [], []);
        const tempUser = new User("John", filter, []);

        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(tempUser, recipearr[0]);

        expect(c.getUserMessages().length).toBe(0);
        expect(c.getRecipeMessages().length).toBe(0);

        c.userSendMessage("what's the calorie count");

        expect(c.getUserMessages().length).toBe(1);
        expect(c.getUserMessages()[0].getText()).toBe("what's the calorie count");

        expect(c.getRecipeMessages().length).toBe(1);

        var response = "This recipe is about " + 182.07481227031252 + " calories per serving.";

        expect(c.getRecipeMessages()[0].getText()).toBe(response);
    });

    it('Chatroom caution test', () => {
        const filter = new Filter("", [], [], []);
        const tempUser = new User("John", filter, []);

        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(tempUser, recipearr[0]);

        expect(c.getUserMessages().length).toBe(0);
        expect(c.getRecipeMessages().length).toBe(0);

        c.userSendMessage("what's the allergy tags");

        expect(c.getUserMessages().length).toBe(1);
        expect(c.getUserMessages()[0].getText()).toBe("what's the allergy tags");

        expect(c.getRecipeMessages().length).toBe(1);

        var response = "Here are some caution tags for this recipe: \n";
        response += "Sulfites"

        expect(c.getRecipeMessages()[0].getText()).toBe(response);
    });

    it('Chatroom multiple phrases', () => {
        const filter = new Filter("", [], [], []);
        const tempUser = new User("John", filter, []);

        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(tempUser, recipearr[0]);

        expect(c.getUserMessages().length).toBe(0);
        expect(c.getRecipeMessages().length).toBe(0);

        c.userSendMessage("hi, what's the allergy tags");

        expect(c.getUserMessages().length).toBe(1);
        expect(c.getUserMessages()[0].getText()).toBe("hi, what's the allergy tags");

        expect(c.getRecipeMessages().length).toBe(1);

        var response = "Hello! My name is Applejack Rabbit Recipe.\n";
        response += "Here are some caution tags for this recipe: \n";
        response += "Sulfites"

        expect(c.getRecipeMessages()[0].getText()).toBe(response);
    });
});