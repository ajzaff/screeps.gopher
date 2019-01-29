var errors = require('helper.errors');
var statuses = require('helper.statuses');

// gc is a standard garbage collection loop.
// It finds orphaned creeps and deletes associated memory.
function gc(config) {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('[GC] Clearing orphaned creep memory:', name);
            delete Memory.creeps[name];
        }
    }
}

// autoscale creeps based on config.
// This might kill units if above the ceiling.
function autoscale(config) {
    for (let role in config) {
        let allCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if(allCreeps.length < config[role].minimum) {
            let roleConfig = config._roles[role];
            let newName = 'gopher_' + role + '-' + Game.time;
            let ret = Game.spawns['Spawn1'].spawnCreep(roleConfig.permissions,
                newName,
                {memory: {role: role, status: statuses.STATUS_IDLE}});
            console.log('[AUTOSCALE] Spawning creep: '+newName+' (role='+role+') had result: '+errors.string(ret));
            if (ret == OK) {
                break; // Successful spawn.
            }
        }
        
        if (allCreeps.length > config[role].ceiling) {
            // Kill a random "idle" unit when above the ceiling.
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
}

// run all creeps by role.
// Log an error for unexpected role names.
function run(config) {
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

module.exports.loop = function() {
    // Garbage collection.
    gc(require('config.gc'));

    // Autoscale creeps.
    autoscale(require('config.autoscaler'));

    // Run creeps by role.
    run(require('config.run'));
}