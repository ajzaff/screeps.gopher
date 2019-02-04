const roleHarvester = require('role.harvester');

module.exports = {
    Run: function(creep, config) {
        if (creep.memory.upgrading == undefined) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            // Use storage. Fallback to harvester.
            var source = creep.room.storage;
            if (source && source.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return OK;
            }

            return roleHarvester.Run(creep, config);
        }
        return OK;
    },
};