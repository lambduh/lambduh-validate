# lambduh-validate
Validates fields of your choice (like S3 keys that you do not want to operate on).

# Usage

```javascript
var Q = require('q');
var validate = require('lambduh-validate');

//your lambda function
exports.handler = function(event, context) {
  var promises = [];
  
  promises.push(function() {
    options.srcKey = "file.gif"
  })
  
  promises.push(validate({
    srcKey: {
      endsWith: '.gif'
    }
  })
  
  promises.push(function(options) {
    context.done()
  })
  
  promises.reduce(Q.when, Q())
    .fail(function(err) {
      console.log("derp");
      console.log(err);
      context.done(null, err);
    });
}
```

This module takes a `requirements` object, where the keys are required fields on the passed `options` object. See the [general Lambduh README]() for info on the `options` object flow. (In short, an `options` object is expected to flow through the full promise chain, and modules are expected to act on it or pass it on, or both).

The `requirements` object has a few features that (I hope) are relatively intuitive:

```javascript
//enforce that `srcKey` exists on `options`
validate({
  srcKey: true
})

//enforce that options.srcKey ends with '.gif'
validate({
  srcKey: {
    endsWith: '\\.gif'
  }
})

//enforce that options.srcKey does NOT end with '_300.gif'
validate({
  srcKey: {
    endsWithout: '_\\d+\\.gif'
  }
})
```

If any condition is not met, the promise will be rejected.

Some work should be done here to prevent these rejects from retrying in Lambda (the default reaction to an error). This has not yet been implemented.
