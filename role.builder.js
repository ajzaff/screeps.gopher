const roleHarvester = require('role.harvester');

module.exports = {
    Run: function(creep, config) {
        if (creep.memory.working == undefined) {
            creep.memory.working = false;
        }
        
        // Try switching to working=false when energy is needed.
        if (creep.memory.working && creep.carry.energy == 0) {
            // Switch state.
            creep.say('transfer');
            creep.memory.working = false;
        } else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            // Switch state.
            creep.say('🛠️ build');
            creep.memory.working = true;
        }
        
        // Try completing a construction site.
        if (creep.memory.working) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(constructionSite);
                }
                return OK;
            }
            // Attempt to move energy into extensions, spawns, and towers.
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER)
                        && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return OK;
            }
            
            // Otherwise upgrade stuff.
            return roleUpgrader.Run(creep, config);
        } else {
            // Use storage. Fallback to harvester mode.
            var source = creep.room.storage;
            if (!source || source[RESOURCE_ENERGY] == 0) {
                source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (source && creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                return roleHarvester.Run(creep, config);
            }
        }

        return OK;
    },
};