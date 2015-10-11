var path = require('path');
var recipes = require(path.resolve(__dirname, '../../../recipeData/GET.json'));

module.exports = function(app/*, next*/) {
  app.models.recipe.create(recipes, function(err, res) {
    if (err) {
      console.log('Recipe loading failed', err);
      return err;
    }
    console.log('Recipe loading succeeded');
  });
};
