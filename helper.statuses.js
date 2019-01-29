module.exports = {
    STATUS_IDLE: 0,
    STATUS_BUSY: 1,
    STATUS_FETCH_ENERGY: 2,
    STATUS_BUILD: 3,
    // String returns a human readable status string for creeps.
    string: function(status) {
        switch (status) {
        case STATUS_IDLE:  return 'STATUS_IDLE(0)';
        case STATUS_BUSY:  return 'STATUS_BUSY(1): creep is busy';
        case STATUS_FETCH_ENERGY: return 'STATUS_FETCH_ENERGY(2)';
        case STATUS_BUILD: return 'STATUS_BUILD(3)';
        default:           return 'STATUS_UNKNOWN('+status+'): status is unknown';
        }
    },
};