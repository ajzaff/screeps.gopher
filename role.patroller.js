var rolePatroller = {
    run: function(creep, config) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (structure) => { return true; }
        });
        if(targets.length > 0) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(targets[0]);
            }
        }
        return OK;
    }
};


module.exports = rolePatroller;