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

  it('should resolve the options object if no requirements are inputted', function(done) {
    var options = {
      key: 'val'
    }
    validate()(options).then(function(opts) {
      if (opts) {
        expect(opts).to.equal(options)
        done()
      } else {
        done(new Error("Expected options object to be resolved."))
      }
    }, function() {
      done(new Error("Expected options object to be resolved."))
    })
  });

  it('should reject with an err if no options are inputted but requirements are set', function(done) {
    var requirements = {
      srcKey: true
    }
    validate(requirements)().then(function(opts) {
      done(new Error("Expected scenario to fail."))
    }, function(err) {
      expect(err).to.exist
      done()
    })
  });

  it('should resolve if required keys exist', function(done) {
    var requirements = {
      srcKey: true
    }
    var options = {
      srcKey: "file.pdf"
    }
    validate(requirements)(options).then(function(opts) {
      if (opts && opts.srcKey) {
        done()
      } else {
        done(new Error("Expected options object to be resolved"))
      }
    }, function(err) {
      done(new Error("Expected validation to resolve"))
    })
  });

  it('should resolve if endsWith requirements are met', function(done) {
    var requirements = {
      srcKey: {
        endsWith: ".pdf"
      }
    }
    var options = {
      srcKey: "file.pdf"
    }
    validate(requirements)(options).then(function(opts) {
      if (opts && opts.srcKey) {
        done()
      } else {
        done(new Error("Expected options object to be resolved"))
      }
    }, function(err) {
      done(new Error("Expected validation to resolve"))
    })
  });

  it('should reject if endsWith requirements are not met', function(done) {
    var requirements = {
      srcKey: {
        endsWith: ".gif"
      }
    }
    var options = {
      srcKey: "file.pdf"
    }
    validate(requirements)(options).then(function(opts) {
      done(new Error("Expected non .gif files to be rejected"))
    }, function() {
      done()
    })
  });

  it('should resolve if endsWithout requirements are met', function(done) {
    var requirements = {
      srcKey: {
        endsWithout: "_180.gif"
      }
    }
    var options = {
      srcKey: "file.gif"
    }
    validate(requirements)(options).then(function(opts) {
      if (opts && opts.srcKey) {
        done()
      } else {
        done(new Error("Expected options object to be resolved"))
      }
    }, function(err) {
      done(new Error("Expected validation to resolve"))
    })
  });

  it('should reject if endsWithout requirements are not met', function(done) {
    var requirements = {
      srcKey: {
        endsWithout: "_\\d+\\.gif"
      }
    }
    var options = {
      srcKey: "file_300.gif"
    }
    validate(requirements)(options).then(function(opts) {
      done(new Error("Expected *_d+.gif files to be rejected"))
    }, function() {
      done()
    })
  });


  describe('e2e -ish', function() {

    it('should reject if requirements are met', function(done) {
      var requirements = {
        srcKey: {
          endsWithout: ".gif",
          endsWithout: "_\\d+\\.gif"
        }
      }
      var options = {
        srcKey: "file_300.gif"
      }
      validate(requirements)(options).then(function(opts) {
        done(new Error("Expected *_d+.gif files to be rejected"))
      }, function() {
        done()
      })
    });

    it('should resolve if requirements are met', function(done) {
      var requirements = {
        srcKey: {
          endsWithout: ".gif",
          endsWithout: "_\\d+\\.gif"
        }
      }
      var options = {
        srcKey: "file.gif"
      }
      validate(requirements)(options).then(function(opts) {
        if (opts) {
          expect(opts).to.equal(options)
          done()
        } else {
          done(new Error("Expected resolved opts to match inputted options"))
        }
      }, function() {
        done(new Error("Expected Validation to pass"))
      })
    });


  })


});
