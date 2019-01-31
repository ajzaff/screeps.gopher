var errors = require('helper.errors');
var structureTower = require('structure.tower');

module.exports = {
    // Run all creeps/structures by role.
    // Log an error for unexpected role names.
    Run: function(config) {
        // Run structures.
        for (let name in Game.structures) {
            let structure = Game.structures[name];
            let res = -999;
            switch (structure.structureType) {
            case STRUCTURE_TOWER:
                let res = structureTower.Run(structure);
            }
            console.log('[RUNNER] Running structure: '+name+' (type='+structure.structureType+') had result: '+errors.string(res));
        }

        // Run creeps.
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            let creepConfig = config._roles[creep.memory.role];
            if (creepConfig && creepConfig.module && creepConfig.module.Run) {
                let res = creepConfig.module.Run(creep, config);
                console.log('[RUNNER] Running creep: '+name+' (role='+creep.memory.role+') had result: '+errors.string(res));
            } else {
                console.log('[RUNNER] Running creep: '+name+' (role='+creep.memory.role+') failed (incomplete definition)');
            }
        }
    },
};