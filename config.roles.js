// Configures the roles assignable to creeps, what permissions they
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
module.exports = {
    builder: {
        permissions: [
            WORK,
            MOVE,
            CARRY,
        ],
        module: require('role.builder'),
    },
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
            WORK,
            MOVE,
            ATTACK,
            CARRY,
        ],
        module: require('role.patroller'),
    }
};