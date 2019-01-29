// Configures the autoscaler capabilities of spawn points.
// !! The roles defined here should accompany an entry in the configRoles map !!
// Config format:
//  {
//      _roles: XXX     // Set of roles for creeps.
//      'ROLE': {       // ROLE = role name map entry.
//          priority: X,// Priority for the rule. Higher is more important.
//                      // See the implementation for detailed spawn logic.
//          minimum: X, // The minimum number of active creeps with this role.
//          maximum: X, // The maximum number of active creeps with this role.
//          ceiling: X, // Any amount above this value is subject to removal.
//      }
//  }
module.exports = {
    _roles: require('config.roles'),
    builder: {
        priority: 100,
        minimum: 4,
        maximum: 4,
        ceiling: 1,
    },
    harvester: {
        priority: 200,
        minimum: 4,
        maximum: 4,
        ceiling: 4,
    },
    upgrader: {
        priority: 200,
        minimum: 8,
        maximum: 8,
        ceiling: 8,
    },
    patroller: {
        priority: 150,
        minimum: 8,
        maximum: 8,
        ceiling: 8,
    },
};