module.exports = {
    // GC is a standard garbage collection loop.
    // It finds orphaned creeps and deletes associated memory.
    GC: function(config) {
        for (let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log('[GC] Clearing orphaned creep memory:', name);
                delete Memory.creeps[name];
            }
        }
    }
};