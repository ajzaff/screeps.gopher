const STATUS_IDLE = 0;
const STATUS_BUSY = 1;
const STATUS_FETCH_ENERGY = 2;
const STATUS_BUILD = 3;

// string returns a human readable status string for creeps.
function string(status) {
    switch (status) {
    case STATUS_IDLE:  return 'STATUS_IDLE(0)';
    case STATUS_BUSY:  return 'STATUS_BUSY(1): creep is busy';
    case STATUS_FETCH_ENERGY: return 'STATUS_FETCH_ENERGY(2)';
    case STATUS_BUILD: return 'STATUS_BUILD(3)';
    default:           return 'STATUS_UNKNOWN('+status+'): status is unknown';
    }
}

module.exports = {
    STATUS_IDLE,
    STATUS_BUSY,
    string,
};