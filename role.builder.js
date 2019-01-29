module.exports = {
    run: function(creep, config) {
        if (creep.memory.working == undefined) {
            creep.memory.working = false;
        }
        
        // Try switching to working=false when energy is needed.
        if (creep.memory.working && creep.carry.energy == 0) {
            // Switch state.
            creep.say('🔄 harvest');
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
            }
        } else {
            // Find energy.
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};