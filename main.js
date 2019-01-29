// gc Garbage collection loop.
function gc(config) {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

// autospawn creeps based on config.
function autospawn(config) {
    for (let role in config) {
        let allCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        if(allCreeps.length < config[role].ceiling) {
            let roleConfig = config._roles[role];
            let newName = 'gopher' + Game.time;
            let ret = Game.spawns['Spawn1'].spawnCreep(roleConfig.permissions,
                newName,
                {memory: {role: role}});
            if (ret == OK) {
                console.log('Spawning new role='+role+': ' + newName);
                break; // Successful spawn.
            } else {
                console.log('Failed to spawn role='+role+': '+newName+': returned: '+config._errors(ret));
            }
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
        if (creepConfig) {
            let res = creepConfig.run(creep, config);
            console.log('Running creep: '+name+' had result: '+config._errors(res));
        } else {
            console.log('Running creep: '+name+' had unexpected role: '+creep.memory.role);
        }
    }
}

module.exports.loop = function () {
    // Garbage collection.
    gc(require('config.gc'));

    // Autospawn creeps.
    // Config format:
    //  'role': CEILING
    autospawn(require('config.autospawn'));

    // Run creeps by role.
    run(require('config.run'));
}