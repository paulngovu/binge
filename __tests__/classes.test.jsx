import RecipeStack from '../classes/RecipeStack'
import User from '../classes/User'
import Filter from '../edamamAPI/Filter'

it('fast class test', () => {
    const filter = new Filter("", [], [], []);

    const tempUser = new User("John", filter, []);
    const tempStack = new RecipeStack(tempUser);

    expect(tempStack.stackEmpty()).toBe(true);
});


test('Full class test', async () => {
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
  })