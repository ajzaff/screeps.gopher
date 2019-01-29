const roleUpgrader = require('role.upgrader');

var rolePatroller = {
    run: function(creep, config) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(target);
            }
        } else {
            // Upgrade when no targets detected.
            return roleUpgrader.run(creep, config);
        }
        return OK;
    }
};


module.exports = rolePatroller;