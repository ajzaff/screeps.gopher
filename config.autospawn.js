// configAutospawn configures the autospawn capabilities of spawn points.
// !! The roles defined here should accompany an entry in the configRoles map !!
// Config format:
//  'ROLE': {       // ROLE = role name map entry.
//      ceiling: X, // the maximum number of active creeps with this role.
//  }
var configAutospawn = {
    _errors: require('config.errors'),
    _roles: require('config.roles'),
    harvester: {
        ceiling: 10,
    },
    upgrader: {
        ceiling: 5,
    },
}

module.exports = configAutospawn;