"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonEditor = void 0;
const fs = require("fs");
class JsonEditor {
    constructor() {
        this.Contents = null;
        this.PathToFile = null;
        this.ContentsAsJson = null;
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
    getValue(key1, key2 = null, key3 = null, key4 = null) {
        if (this.ContentsAsJson === null) {
            return null;
        }
        else if (key1 === null) {
            return null;
        }
        else {
            let returnValue;
            if (key4 !== null &&
                key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2] &&
                this.ContentsAsJson[key1][key3]) {
                returnValue = this.ContentsAsJson[key1][key2][key3][key4];
            }
            else if (key3 !== null &&
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
    getValueAsArray(key1, key2 = null, key3 = null, key4 = null) {
        if (this.ContentsAsJson === null) {
            return null;
        }
        else if (key1 === null) {
            return null;
        }
        else {
            let returnValue;
            if (key4 !== null &&
                key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2] &&
                this.ContentsAsJson[key1][key3]) {
                returnValue = this.ContentsAsJson[key1][key2][key3][key4];
            }
            else if (key3 !== null &&
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
    setValue(theValue, key1, key2 = null, key3 = null, key4 = null) {
        if (this.ContentsAsJson === null) {
            return;
        }
        if (key1 === null) {
            return;
        }
        else if (key4 !== null &&
            key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2, key3);
            this.ContentsAsJson[key1][key2][key3][key4] = theValue;
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
    setValueAsArray(theValue, key1, key2 = null, key3 = null, key4 = null) {
        if (this.ContentsAsJson === null) {
            return;
        }
        if (key1 === null) {
            return;
        }
        else if (key4 !== null &&
            key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2, key3);
            this.ContentsAsJson[key1][key2][key3][key4] = theValue;
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
    ensureJsonPropertyExists(key1, key2 = null, key3 = null) {
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
        if (key3 === null) {
            return;
        }
        else if (!this.ContentsAsJson[key1][key2][key3]) {
            this.ContentsAsJson[key1][key2][key3] = {};
        }
    }
}
exports.JsonEditor = JsonEditor;
