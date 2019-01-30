const roleUpgrader = require('role.upgrader');

module.exports = {
    Run: function(creep, config) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source && creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER)
                        && structure.energy < structure.energyCapacity;
                }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // Upgrade.
                return roleUpgrader.Run(creep, config);
            }
        }
        return OK;
    },
};