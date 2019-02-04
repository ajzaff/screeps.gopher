const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

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
            // Attempt to move energy into min extension, spawn, or tower.
            var min = 10000;
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    st = (structure.structureType == STRUCTURE_EXTENSION
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_TOWER);
                    if (st && structure.energy < min) {
                        min = structure.energy;
                        return true;
                    }
                    return false;
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