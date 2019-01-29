var errors = require('helper.errors');

module.exports = {
    // Run all creeps by role.
    // Log an error for unexpected role names.
    Run: function(config) {
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            let creepConfig = config._roles[creep.memory.role];
            if (creepConfig && creepConfig.module && creepConfig.module.run) {
                let res = creepConfig.module.run(creep, config);
                console.log('[RUNNER] Running creep: '+name+' (role='+creep.memory.role+') had result: '+errors.string(res));
            } else {
                console.log('[RUNNER] Running creep: '+name+' (role='+creep.memory.role+') failed (incomplete definition)');
            }
        }
    }
};