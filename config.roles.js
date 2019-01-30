// Configures the roles assignable to creeps, what permissions they
// have and the code for the run function.
// Format:
//  'ROLE': {
//      parts: [            // Assinged parts. This is the entire "body" arg.
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
        parts: [
            WORK,
            MOVE, MOVE,
            CARRY, CARRY,
        ],
        module: require('role.builder'),
    },
    harvester: {
        parts: [
            WORK,
            MOVE, MOVE,
            CARRY, CARRY,
        ],
        module: require('role.harvester'),
    },
    upgrader: {
        parts: [
            WORK,
            MOVE, MOVE,
            CARRY, CARRY,
        ],
        module: require('role.upgrader'),
    },
    patroller: {
        parts: [
            WORK,
            MOVE, MOVE, MOVE,
            ATTACK, ATTACK,
            CARRY,
        ],
        module: require('role.patroller'),
    },
};