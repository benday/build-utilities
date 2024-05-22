import * as fs from 'fs';

export class JsonEditor {
    public Contents: string | null = null;
    public PathToFile: string | null = null;
    public ContentsAsJson: any = null;

    constructor() {

    }

    public open(filename: string): void {
        var contents = fs.readFileSync(filename, 'utf8');

        this.Contents = contents;
        this.PathToFile = filename;
        this.ContentsAsJson = JSON.parse(this.Contents.replace(/^\uFEFF/, ""));
    }

    public save(filename: string): void {
        fs.writeFileSync(filename,
            JSON.stringify(this.ContentsAsJson), 'utf8');
    }

    public getConnectionString(key: string): string | null {
        return this.getValue("ConnectionStrings", key);
    }

    public setConnectionString(key: string, value: string): void {
        this.setValue(value, "ConnectionStrings", key);
    }

    public getValue(
        key1: string,
        key2: string | null = null,
        key3: string | null = null,
        key4: string | null = null): string | null {
        if (this.ContentsAsJson === null) {
            return null;
        }
        else if (key1 === null) {
            return null;
        }
        else {
            let returnValue: string;

            if (key4 !== null &&
                key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2] &&
                this.ContentsAsJson[key1][key3]) {
                returnValue = this.ContentsAsJson[key1][key2][key3][key4];
            } else if (key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2]) {
                returnValue = this.ContentsAsJson[key1][key2][key3];
            } else if (key2 !== null && key1 !== null && this.ContentsAsJson[key1]) {
                returnValue = this.ContentsAsJson[key1][key2];
            } else {
                returnValue = this.ContentsAsJson[key1];
            }

            if (!returnValue) {
                return null;
            } else {
                return returnValue;
            }
        }
    }

    public getValueAsArray(
        key1: string,
        key2: string | null = null,
        key3: string | null = null,
        key4: string | null = null): string[] | null {

        if (this.ContentsAsJson === null) {
            return null;
        }
        else if (key1 === null) {
            return null;
        }
        else {
            let returnValue: string[];

            if (key4 !== null &&
                key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2] &&
                this.ContentsAsJson[key1][key3]) {
                returnValue = this.ContentsAsJson[key1][key2][key3][key4];
            } else if (key3 !== null &&
                key2 !== null &&
                key1 !== null &&
                this.ContentsAsJson[key1] &&
                this.ContentsAsJson[key1][key2]) {
                returnValue = this.ContentsAsJson[key1][key2][key3];
            } else if (key2 !== null && key1 !== null && this.ContentsAsJson[key1]) {
                returnValue = this.ContentsAsJson[key1][key2];
            } else {
                returnValue = this.ContentsAsJson[key1];
            }

            if (!returnValue) {
                return null;
            } else {
                return returnValue;
            }
        }
    }

    public setValue(theValue: string, 
        key1: string, 
        key2: string | null = null, 
        key3: string | null = null, 
        key4: string | null = null): void {
            
        if (this.ContentsAsJson === null) {
            return;
        }

        if (key1 === null) {
            return;
        } else if (key4 !== null &&
            key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2, key3);
            this.ContentsAsJson[key1][key2][key3][key4] = theValue;
        } else if (key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2);
            this.ContentsAsJson[key1][key2][key3] = theValue;
        } else if (key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1);
            this.ContentsAsJson[key1][key2] = theValue;
        } else {
            this.ContentsAsJson[key1] = theValue;
        }
    }

    public setValueAsArray(
            theValue: string[], 
            key1: string, 
            key2: string | null = null, 
            key3: string | null = null, 
            key4: string | null = null): void {
        if (this.ContentsAsJson === null) {
            return;
        }

        if (key1 === null) {
            return;
        } else if (key4 !== null &&
            key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2, key3);
            this.ContentsAsJson[key1][key2][key3][key4] = theValue;
        } else if (key3 !== null && key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1, key2);
            this.ContentsAsJson[key1][key2][key3] = theValue;
        } else if (key2 !== null && key1 !== null) {
            this.ensureJsonPropertyExists(key1);
            this.ContentsAsJson[key1][key2] = theValue;
        } else {
            this.ContentsAsJson[key1] = theValue;
        }
    }

    private ensureJsonPropertyExists(key1: string,
        key2: string | null = null, key3: string | null = null): void {
        if (key1 === null) {
            return;
        } else if (!this.ContentsAsJson[key1]) {
            this.ContentsAsJson[key1] = {};
        }

        if (key2 === null) {
            return;
        } else if (!this.ContentsAsJson[key1][key2]) {
            this.ContentsAsJson[key1][key2] = {};
        }

        if (key3 === null) {
            return;
        } else if (!this.ContentsAsJson[key1][key2][key3]) {
            this.ContentsAsJson[key1][key2][key3] = {};
        }
    }
}