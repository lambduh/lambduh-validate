var expect = require('chai').expect;

var validate = require('../');

describe('validateS3Key', function() {
  it('should exist', function() {
    expect(validate).to.exist;
  });

  it('should return a function', function() {
    expect(validate()).to.be.a('function');
  });

  it('should return a function that returns a promise', function() {
    expect(validate()().then).to.exist
  });
});
