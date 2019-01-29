// configErrors maps an error code to a meaningful error string.
// These wrap standard error codes from the library, so the error consts should already be defined everywhere.
function string(ret) {
    switch(ret) {
    case  0:  return 'OK(0)';
    case -1:  return 'ERR_NOT_OWNER(-1): you are not the owner of this spawn';
    case -2:  return 'ERR_NO_PATH(-2): no path to the target';
    case -3:  return 'ERR_NAME_EXISTS(-3): there is a creep with the same name already';
    case -4:  return 'ERR_BUSY(-4): the spawn is already in process of spawning another creep';
    case -5:  return 'ERR_NOT_FOUND(-5): no memorized path found for creep';
    case -6:  return 'ERR_NOT_ENOUGH_ENERGY(-6): the structure (or its extensions) lack energy to complete the action';
    case -7:  return 'ERR_INVALID_TARGET(-7): invalid target';
    case -10: return 'ERR_INVALID_ARGS(-10): malformed body in request';
    case -11: return 'ERR_TIRED(-11): fatigued';
    case -12: return 'ERR_NO_BODYPART(-12): lacks permission: MOVE';
    case -14: return 'ERR_RCL_NOT_ENOUGH(-14): insufficient room Controller level';
    default:  return 'ERR_UNKNWON('+ret+'): an unknown error occurred';
    }
}

module.exports = {
    string,
};