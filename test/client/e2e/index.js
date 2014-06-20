'use strict';

var pages = require('..');
describe('no protractor at all', function() {
  it('should still do normal tests', function() {
    expect(true).to.equal(true);
  });
});

describe('protractor library', function() {
  it('should expose the correct global variables', function() {
    expect(protractor).to.exist;
    expect(browser).to.exist;
    expect(by).to.exist;
    expect(element).to.exist;
    expect($).to.exist;
  });

  it('should wrap webdriver', function() {
    var homepage = new pages.homepage();
    homepage.get();
    expect(browser.getTitle()).to.eventually.equal('My Kitchen');
  });
});
