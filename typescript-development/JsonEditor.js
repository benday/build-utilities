"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonEditor = void 0;
const fs = __importStar(require("fs"));
class JsonEditor {
    constructor() {
        this.Contents = '';
        this.PathToFile = '';
    }
    open(filename) {
        var contents = fs.readFileSync(filename, 'utf8');
        this.Contents = contents;
        this.PathToFile = filename;
        this.ContentsAsJson = JSON.parse(this.Contents.replace(/^\uFEFF/, ""));
    }
    save(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.ContentsAsJson), 'utf8');
    }
    getConnectionString(key) {
        return this.getValue("ConnectionStrings", key);
    }
    setConnectionString(key, value) {
        this.setValue(value, "ConnectionStrings", key);
    }
    getValue(key1, key2 = null, key3 = null) {
        if (this.ContentsAsJson === null) {
            return null;
        }
        else if (key1 === null) {
            return null;
        }
        else {
            var returnValue;
            if (key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2]) {
                returnValue = this.ContentsAsJson[key1][key2][key3];
            }
            else if (key2 !== null && key1 !== null && this.ContentsAsJson[key1]) {
                returnValue = this.ContentsAsJson[key1][key2];
            }
            else {
                returnValue = this.ContentsAsJson[key1];
            }
            if (!returnValue) {
                return null;
            }
            else {
                return returnValue;
            }
        }
    }
    setValue(theValue, key1, key2 = null, key3 = null) {
        if (this.ContentsAsJson === null) {
            return;
        }
        if (key1 === null) {
            return;
        }
        else if (key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2);
            this.ContentsAsJson[key1][key2][key3] = theValue;
        }
        else if (key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1);
            this.ContentsAsJson[key1][key2] = theValue;
        }
        else {
            this.ContentsAsJson[key1] = theValue;
        }
    }
    ensureJsonPropertyExists(key1, key2 = null) {
        if (key1 === null) {
            return;
        }
        else if (!this.ContentsAsJson[key1]) {
            this.ContentsAsJson[key1] = {};
        }
        if (key2 === null) {
            return;
        }
        else if (!this.ContentsAsJson[key1][key2]) {
            this.ContentsAsJson[key1][key2] = {};
        }
    }
}
exports.JsonEditor = JsonEditor;
//# sourceMappingURL=JsonEditor.js.map