module.exports = {
    Run: function(structure) {
        var closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            return structure.attack(closestHostile);
        } else if (structure.energy > structure.energyCapacity/2) {
            // No hostiles and surplus energy. Repair mode.
            var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
            if(closestDamagedStructure) {
                return structure.repair(closestDamagedStructure);
            }
        }
        return OK;
    }
};