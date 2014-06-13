'use strict';

describe("E2E: Testing Requests", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working / page', function() {
  	browser().navigateTo('#/');
    expect(browser().location().path()).to.equal('/');
  });
});