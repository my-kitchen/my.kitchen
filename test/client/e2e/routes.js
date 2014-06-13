'use strict';

describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should stay on / path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).to.equal('/');
  });
});