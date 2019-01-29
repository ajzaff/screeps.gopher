module.exports.loop = function() {
    // Garbage collection.
    require('main.gc').GC(require('config.gc'));

    // Autoscale creeps.
    require('main.autoscaler').Autoscale(require('config.autoscaler'));

    // Run creeps by role.
    require('main.runner').Run(require('config.run'));
}