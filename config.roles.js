// configRoles configures the roles assignable to creeps, what permissions they
// have and the code for the run function.
// Format:
//  'ROLE': {
//      permissions: [      // Assinged permissions. This is the entire "body".
//          WORK,           // See: <//docs.screeps.com/api/#StructureSpawn>
//          MOVE,
//          CARRY,
//          ATTACK,
//          RANGED_ATTACK,
//          HEAL,
//          TOUGH,
//          CLAIM,
//      ],
//  }
var configRoles = {
    harvester: {
        permissions: [
            WORK,
            MOVE,
            CARRY,
        ],
        module: require('role.harvester'),
    },
    upgrader: {
        permissions: [
            WORK,
            MOVE,
            CARRY,
        ],
        module: require('role.upgrader'),
    },
    patroller: {
        permissions: [
            MOVE,
            ATTACK,
        ],
        module: require('role.patroller'),
    }
};

module.exports = configRoles;