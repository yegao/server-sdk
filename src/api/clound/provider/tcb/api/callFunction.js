var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { 
        return setTimeout(resolve, ms);
    });
};

function callFunction(options, config) {
    var tcbInstance, res;
    return function (_a) {
        switch (_a.label) {
            case 0: return [4 , sleep()];
            case 1: _a.sent();
                tcbInstance = tcb.config.envName === config.env ? tcb : tcb.init(config);
                return [4 , tcbInstance.callFunction({
                        name: options.name,
                        data: options.data,
                    })];
            case 2:
                res = _a.sent();
                if (res.code && error_config.TCB_ERR_CODE[res.code] !== 0) {
                    throw {
                        errCode: error_config.TCB_ERR_CODE[res.code] || error_config.TCB_ERR_CODE.SYS_ERR,
                        errMsg: "requestID " + res.requestId + ", " + res.message,
                        requestId: res.requestId,
                    };
                }
                else {
                    return [2 , {
                            result: res.result,
                            requestId: res.requestId,
                        }];
                }
                return [2 ];
        }
    }
}