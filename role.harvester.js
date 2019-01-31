const roleUpgrader = require('role.upgrader');

module.exports = {
    Run: function(creep, config) {
        if (creep.memory.robin === undefined) {
            creep.memory.robin = 0;
        }
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source && creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER
                            || structure.structureType == STRUCTURE_STORAGE)
                        && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                creep.memory.robin %= targets.length;
                let target = targets[creep.memory.robin];
                ret = creep.transfer(target, RESOURCE_ENERGY);
                switch (ret) {
                case ERR_NOT_IN_RANGE:
                    return creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                case OK:
                case ERR_FULL: // if it filled up recently.
                    creep.memory.robin++;
                    break;
                default:
                    return ret;
                }
            } else {
                // Upgrade.
                return roleUpgrader.Run(creep, config);
            }
        }
        return OK;
    },
};