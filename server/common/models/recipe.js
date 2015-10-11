module.exports = function(Recipe) {
  Recipe.observe('before save', function updateTimestamp(ctx, next) {
    if (!ctx.isNewInstance) {
      console.log('Update instance');
      /*if () {
        next(new Error('must be logged in to update');
      }
      nex
      return;*/
    }
    ctx.instance.createdAt = new Date();
    next();
  });

  /*Recipe.beforeRemote('*.save', function(ctx, unused, next) {
    if(ctx.req.createdAt) {
      next();
    } else {
      next(new Error('must be logged in to update'))
    }
  });*/
};
