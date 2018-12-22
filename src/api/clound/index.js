// let tcb = {
//     init(){
//         //配置config
//     },
//     config: {
//         secretId,
//         secretKey,
//         sessionToken,
//         envName,
//         timeout,
//         proxy: proxy
//     },
//     database(config){
//         //根据config生成数据库实例
//     }
// }

class Cloud {

    constructor() {
        var _this = this;
        this.inited = false;
        this.services = {};
        this.exportAPI = {
            init: this.init.bind(this),
            registerService: function (serviceProvider) {
                _this.registerService(serviceProvider.createService(_this));
            }
        };
        index.registerServices(this);
        this.meta = {
            session_id: (+new Date).toString()
        };
        this.defaultConfig = {};
        this.provider = {
            init: tcb.init.bind(tcb),
            get config() {
                return tcb.config;
            },
            sendRequest: function (options) {
                return tcbRequest({ config: tcb.config, params: options.data,...options });// 返回一个promise 
            },
            api: {
                addDocument: database.addDocument,
                queryDocument: database.queryDocument,
                updateDocument: database.updateDocument,
                removeDocument: database.removeDocument,
                countDocument: database.countDocument,
                callFunction: callFunction.callFunction,
                downloadFile: downloadFile.downloadFile,
                uploadFile: uploadFile.uploadFile,
                deleteFile: deleteFile.deleteFile,
                getTempFileURL: getTempFileURL.getTempFileURL,
                callOpenAPI: callOpenAPI.callOpenAPI,
            }
        };
    }

    init(config) {
        if (config === void 0) { config = {}; }
        if (this.inited) return;
        this.inited = true;
        this.provider.init(config); // 为tbc实例配置config,其实就是执行了tcb.init(config) 这样就会将config附加到[[tcb]].config中
        this.defaultConfig = config;
    };

    getMetaData() {
        return this.meta;
    };
    getDefaultConfig() {
        return this.defaultConfig;
    };
    getOverriddenConfig(config, service) {
        var overriden = tslib.__assign({}, this.defaultConfig);
        Object.assign(overriden, config);
        if (service) {
            var env = this.getEnv(overriden, service);
            overriden.env = env;
        }
        return overriden;
    };
    getEnv(config, service) {
        if (!config.env)
            return;
        switch (type.getType(config.env)) {
            case 'string': {
                return config.env;
            }
            case 'object': {
                return config.env[service];
            }
            default: {
                return;
            }
        }
    };
    getAPIs() {
        return this.exportAPI;
    };
    registerService(service) {
        this.services[service.name] = service;
        var functions = service.getAPIs();
        for (var name in functions) {
            this.registerFunction(name, functions[name]);
        }
    };
    registerFunction(name, func) {
        var instance = this;
        this.exportAPI[name] = function() {
            if (!instance.inited) {
                throw new error.CloudSDKError({
                    errMsg: 'Cloud API isn\'t enabled, please call init first\n' +
                        '请先调用 init 完成初始化后再调用其他云 API。init 方法可传入一个对象用于设置默认配置，详见文档。'
                });
            }
            return func.apply(this, arguments);
        };
    };
}