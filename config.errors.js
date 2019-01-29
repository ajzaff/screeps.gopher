// configErrors maps an error code to a meaningful error string.
var configErrors = function(ret) {
    switch(ret) {
    case  0:  return 'OK(0)';
    case -1:  return 'ERR_NOT_OWNER(-1): you are not the owner of this spawn';
    case -3:  return 'ERR_NAME_EXISTS(-3): there is a creep with the same name already';
    case -4:  return 'ERR_BUSY(-4): the spawn is already in process of spawning another creep';
    case -6:  return 'ERR_NOT_ENOUGH_ENERGY(-6): the structure (or its extensions) lack energy to complete the action';
    case -10: return 'ERR_INVALID_ARGS(-10): malformed body in request';
    case -14: return 'ERR_RCL_NOT_ENOUGH(-14): insufficient room Controller level';
    default:  return 'ERR_UNKNWON('+ret+'): an unknown error occurred';
    }
}

module.exports = configErrors;