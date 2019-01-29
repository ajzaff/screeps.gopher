// configRun configures the main run loop.
// Config format:
//  'roles': XXX    // Set of roles for creeps.
//  'errors': XXX   // Set the default error message helper.
var configRun = {
    _roles: require('config.roles'),
    _errors: require('config.errors'),
};

module.exports = configRun;