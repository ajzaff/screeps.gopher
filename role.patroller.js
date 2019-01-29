const roleUpgrader = require('role.upgrader');

module.exports = {
    Run: function(creep, config) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(target);
            }
        } else {
            // Upgrade when no targets detected.
            return roleUpgrader.Run(creep, config);
        }
        return OK;
    },
};