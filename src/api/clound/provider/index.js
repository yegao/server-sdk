export default function getProvider() {
    var tslib = require( "tslib");
    var tcb = require( "tcb-admin-node");
    var tcbRequest = require( "tcb-admin-node/src/utils/httpRequest");
    var database = require( "./src/api/cloud/provider/tcb/api/database.js");
    var callFunction = require( "./src/api/cloud/provider/tcb/api/callFunction.js");
    var downloadFile = require( "./src/api/cloud/provider/tcb/api/downloadFile.js");
    var uploadFile = require( "./src/api/cloud/provider/tcb/api/uploadFile.js");
    var deleteFile = require( "./src/api/cloud/provider/tcb/api/deleteFile.js");
    var getTempFileURL = require( "./src/api/cloud/provider/tcb/api/getTempFileURL.js");
    var callOpenAPI = require( "./src/api/cloud/provider/tcb/api/callOpenAPI.js");
    return {
        init: tcb.init.bind(tcb),
        get config() {
            return tcb.config;
        },
        sendRequest: function (options) {
            return tcbRequest({ config: tcb.config, params: options.data , ...options})
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

// database = {
//   Geo,
//   command,
//   RegExp,
//   config,
//   constructor(config) {
//     this.config = config;
//     this.Geo = Geo;
//     this.command = Command;
//     this.RegExp = RegExpConstructor;
//   },
//   serverDate({ offset = 0 } = {}) {
//     return new ServerDate({ offset });
//   },
//   collection(collName) {
//     return new CollectionReference(this, collName);
//   },
//   createCollection(collName) {
//     let request = new Request(this);
//     return request.send("addCollection", {
//         collectionName: collName
//     });
//   }
// }
