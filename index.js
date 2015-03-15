var Q = require('q');

module.exports = function(settings) {
  return function(options) {
    var def = Q.defer();
    if (!options) { options = {} }

    if (!settings) {
      def.resolve(options);
    } else {
      for (key in settings) {
        if (!options[key]) {
          def.reject(new Error('Validate expected options to include: ' + key));
        }
      }

    }

    return def.promise;
  }
}
