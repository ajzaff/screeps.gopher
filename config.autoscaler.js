// configAutoscaler configures the autoscaler capabilities of spawn points.
// !! The roles defined here should accompany an entry in the configRoles map !!
// Config format:
//  {
//      _roles: XXX    // Set of roles for creeps.
//      'ROLE': {       // ROLE = role name map entry.
//          priority: X,// Priority for the rule. Higher is more important.
//                      // See the implementation for detailed spawn logic.
//          ceiling: X, // the maximum number of active creeps with this role.
//      }
//  }
var configAutoscaler = {
    _roles: require('config.roles'),
    harvester: {
        priority: 200,
        minimum: 2,
        ceiling: 4,
    },
    upgrader: {
        priority: 150,
        minimum: 2,
        ceiling: 3,
    },
}

module.exports = configAutoscaler;