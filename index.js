var Q = require('q');

module.exports = function(requirements) {
  return function(options) {
    var def = Q.defer();
    if (!options) { options = {} }

    function endsWith(string, endString) {
      return new RegExp(endString + '$').test(string);
    }

    function startsWith(string, startString) {
      return new RegExp("^" + startString).test(string);
    }

    if (!requirements) {
      def.resolve(options);
    } else {
      for (key in requirements) {
        if (!options[key]) {
          def.reject(new Error('Validate expected options to include: ' + key));
        } else {
          if (requirements[key].endsWith) {
            if (!endsWith(options[key], requirements[key].endsWith)) {
              def.reject(new Error('Invalid: ' + options[key] + ' does not end with: ' + requirements[key].endsWith))
            }
          }

          if (requirements[key].endsWithout) {
            if (endsWith(options[key], requirements[key].endsWithout)) {
              def.reject(new Error('Invalid: ' + options[key] + ' ends with: ' + requirements[key].endsWithout))
            }
          }

          if (requirements[key].startsWith) {
            if (!startsWith(options[key], requirements[key].startsWith)) {
              def.reject(new Error('Invalid: ' + options[key] + ' does not start with: ' + requirements[key].startsWith))
            }
          }

        }
      }

      //gotten this far without invalidating
      def.resolve(options)
    }

    return def.promise;
  }
}
