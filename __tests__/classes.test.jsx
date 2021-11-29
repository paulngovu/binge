import RecipeStack from '../classes/RecipeStack'
import User from '../classes/User'
import Filter from '../edamamAPI/Filter'
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


    it('Chatroom test', () => {
        const json = require("../edamamAPI/recipeApiExample.json");
        const recipearr = Recipe.parseJson(json);

        const c = new Chatroom(recipearr[0]);

        expect(c.recipeResponse("Hello!")).toBe("Hello! My name is Applejack Rabbit Recipe.");
        expect(c.recipeResponse("What is your recipe URL?")).toBe("You can find the full recipe here: http://www.seriouseats.com/recipes/2011/10/applejack-rabbit-classic-apple-brandy-cocktail-pdt-recipe.html");
        expect(c.recipeResponse("What are your ingredients?")).toBe("Here are a list of ingredients that you will need for this dish: \n2 ounces Laird's Bonded Apple Brandy, 3/4 ounce fresh lemon juice, 3/4 ounce fresh orange juice, 1/2 ounce Deep Mountain Grade B Maple Syrup");
        expect(c.recipeResponse("How many calories do you contain?")).toBe("This recipe is about 182.07481227031252 calories per serving.");
        expect(c.recipeResponse("Are there any cautions I should be aware of?")).toBe("Here are some caution tags for this recipe: \nSulfites");
        expect(c.recipeResponse("What is your meal type?")).toBe("This recipe is labeled as a lunch/dinner meal.");
        expect(c.recipeResponse("What is your cuisine type?")).toBe("This recipe is labeled as a world dish.");
        expect(c.recipeResponse("What is your dish type?")).toBe("This recipe is labeled as a alcohol-cocktail dish.");
    });
})