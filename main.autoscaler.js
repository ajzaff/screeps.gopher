var errors = require('helper.errors');
var statuses = require('helper.statuses');

module.exports = {
    // Autoscale creeps based on config.
    Autoscale: function(config) {
        for (let role in config) {
            let allCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    
            if(allCreeps.length < config[role].minimum) {
                let roleConfig = config._roles[role];
                let newName = 'gopher_' + role + '-' + Game.time;
                let ret = Game.spawns['Spawn1'].spawnCreep(roleConfig.parts,
                    newName,
                    {memory: {role: role, status: statuses.STATUS_IDLE}});
                console.log('[AUTOSCALE] Spawning creep: '+newName+' (role='+role+') had result: '+errors.string(ret));
                if (ret == OK) {
                    break; // Successful spawn.
                }
            }
            
            if (allCreeps.length > config[role].ceiling) {
                // TODO(ajzaff): Kill a random "idle" unit when above the ceiling.
            }
        }
        // Visual flair for autospawn.
        if(Game.spawns['Spawn1'].spawning) {
            let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },
};