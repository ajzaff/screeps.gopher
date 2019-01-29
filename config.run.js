// configRun configures the main run loop.
// Config format:
//  {
//      _roles: XXX    // Set of roles for creeps.
//      _errors: XXX   // Set the default error message helper.
//  }
var configRun = {
    _roles: require('config.roles'),
};

module.exports = configRun;