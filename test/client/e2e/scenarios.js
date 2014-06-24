'use strict';

describe('MyKitchen', function() {
  describe('Recipe list view', function() {
    beforeEach(function() {
      browser.get('index.html');
    });

    it('filter the recipe list as user types into the search box', function() {
      var recipeList = element.all(by.repeater('recipe in recipes'));
      var query = element(by.model('query'));

      expect(recipeList.count()).to.eventually.equal(15);

      query.sendKeys('Tarte');
      expect(recipeList.count()).to.eventually.equal(2);

      query.clear();
      query.sendKeys('chocolat');
      expect(recipeList.count()).to.eventually.equal(4);
    });

    it('is possible to control recipe order via the drop down select box', function() {
      var recipeNameColumn = element.all(by.repeater('recipe in recipes').column('{{recipe.name}}'));
      var query = element(by.model('query'));

      function getNames() {
        return recipeNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('Tarte');

      expect(getNames()).to.eventually.deep.equal([
        'Tarte aux pommes',
        'Tarte au citron meringuée',
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).to.eventually.deep.equal([
        'Tarte au citron meringuée',
        'Tarte aux pommes',
      ]);
    });
  });
});
