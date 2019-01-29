var rolePatroller = {
    run: function(creep, config) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(target);
            }
        }
        return OK;
    }
};


module.exports = rolePatroller;