import * as fs from 'fs';
import { JsonEditor } from './JsonEditor';

describe('JsonEditor', () => {
    var _SystemUnderTest: JsonEditor;
    const _PathToAppSettingsFileWithValues: string = './sample-files/appsettings.json';
    const _PathToAppSettingsFileWithoutValues: string = './sample-files/appsettings-no-connection-strings.json';
    const _PathToAppSettingsTempFile: string = './sample-files/appsettings-temp.json';

    beforeEach(function () {
        console.log('beforeEach starting...');
        _SystemUnderTest = new JsonEditor();
        console.log('beforeEach completed...');
    });

    it('Should initialize', () => {
        expect(_SystemUnderTest).toBeTruthy();
    });

    it('Should load a file and contents should be available', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);        

        expect(_SystemUnderTest.Contents).not.toBeNull();
    });

    it('Should load a file and path to file property should be populated', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        expect(_SystemUnderTest.PathToFile).toBe(_PathToAppSettingsFileWithValues);
    });

    it('Should load file contents as JSON', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        console.log(_SystemUnderTest.ContentsAsJson);

        expect(_SystemUnderTest.ContentsAsJson).not.toBeNull();
    });

    it('Should load file contents as JSON', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        console.log(_SystemUnderTest.ContentsAsJson);

        expect(_SystemUnderTest.ContentsAsJson).not.toBeNull();
    });

    it('Should return connection string for valid conn string name', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        var actual = _SystemUnderTest.getConnectionString("default");

        console.log(actual);

        expect(actual).toBe('Server=localhost; Database=Benday.Ef3; User Id=sa; Password=Pa$$word;');
    });

    it('Should return null for invalid conn string name', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        var actual = _SystemUnderTest.getConnectionString("bogus");

        expect(actual).toBeNull();
    });

    it('Should return null for when there are not any connection strings', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var actual = _SystemUnderTest.getConnectionString("bogus");

        expect(actual).toBeNull();
    });

    it('Set connection string name overwrites existing value', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        var original = _SystemUnderTest.getConnectionString("default");

        var expected = 'new value';

        _SystemUnderTest.setConnectionString("default", expected);

        var actual = _SystemUnderTest.getConnectionString("default");

        console.log(actual);

        expect(actual).toBe(expected);
    });

    it('Set connection string for new connection string key', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithValues);

        var original = _SystemUnderTest.getConnectionString("new-value");

        expect(original).toBeNull();

        var expected = 'new value';

        _SystemUnderTest.setConnectionString("new-value", expected);

        var actual = _SystemUnderTest.getConnectionString("new-value");

        console.log(actual);

        expect(actual).toBe(expected);
    });

    it('Set connection string name initializes connection strings json section', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var original = _SystemUnderTest.getConnectionString("new-value");

        expect(original).toBeNull();

        var expected = 'new value';

        _SystemUnderTest.setConnectionString("new-value", expected);

        var actual = _SystemUnderTest.getConnectionString("new-value");

        console.log(_SystemUnderTest.ContentsAsJson);

        expect(actual).toBe(expected);
    });

    it('Set multiple connection string name initializes connection strings json section', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var expected = 'new value';

        _SystemUnderTest.setConnectionString("new-value0", expected);
        var actual0 = _SystemUnderTest.getConnectionString("new-value0");

        _SystemUnderTest.setConnectionString("new-value1", expected);
        var actual1 = _SystemUnderTest.getConnectionString("new-value1");


        console.log(_SystemUnderTest.ContentsAsJson);

        expect(actual0).toBe(expected);
        expect(actual1).toBe(expected);
    });

    it('Saves changes to file', () => {
        if (fs.existsSync(_PathToAppSettingsTempFile) === true) {
            fs.unlinkSync(_PathToAppSettingsTempFile);
        }

        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        _SystemUnderTest.setConnectionString("asdf", "value 123");

        _SystemUnderTest.save(_PathToAppSettingsTempFile);

        expect(fs.existsSync(_PathToAppSettingsTempFile)).toBe(true);
    });


    it('Get first level value in json returns value', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key = 'AllowedHosts';
        var expected = '*';

        var actual = _SystemUnderTest.getValue(key);

        expect(actual).toBe(expected);
    });

    it('Get second level value in json returns value', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'Level2Value';
        var expected = 'level 2';

        var actual = _SystemUnderTest.getValue(key1, key2);

        expect(actual).toBe(expected);
    });

    it('Get third level value in json returns value', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'Level2';
        var key3 = 'Level3Value';
        var expected = 'level 3';

        var actual = _SystemUnderTest.getValue(key1, key2, key3);

        expect(actual).toBe(expected);
    });


    it('Get first level value in json for invalid key returns null', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key = 'bogus1';
        
        var actual = _SystemUnderTest.getValue(key);

        expect(actual).toBeNull();
    });

    it('Get second level value in json for invalid key returns null', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'bogus2';

        var actual = _SystemUnderTest.getValue(key1, key2);

        expect(actual).toBeNull();
    });

    it('Get third level value in json for invalid key returns null', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'Level2';
        var key3 = 'bogus3';

        var actual = _SystemUnderTest.getValue(key1, key2, key3);

        expect(actual).toBeNull();
    });

    it('Modify existing value in json: first level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1Value';
        var expected = 'updated value';
        
        _SystemUnderTest.setValue(expected, key1);

        var actual = _SystemUnderTest.getValue(key1);

        expect(actual).toBe(expected);
    });

    it('Modify existing value in json: second level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'Level2Value';
        var expected = 'updated value';

        _SystemUnderTest.setValue(expected, key1, key2);

        var actual = _SystemUnderTest.getValue(key1, key2);

        expect(actual).toBe(expected);
    });

    it('Modify existing value in json: third level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'Level1';
        var key2 = 'Level2';
        var key3 = 'Level3Value';
        var expected = 'updated value';

        _SystemUnderTest.setValue(expected, key1, key2, key3);

        var actual = _SystemUnderTest.getValue(key1, key2, key3);

        expect(actual).toBe(expected);
    });

    it('Set new value in json: first level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'newLevel1Value';
        var expected = 'updated value';

        _SystemUnderTest.setValue(expected, key1);

        var actual = _SystemUnderTest.getValue(key1);

        expect(actual).toBe(expected);
    });

    it('Set new value in json: second level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'newLevel1';
        var key2 = 'newLevel2Value';
        var expected = 'updated value';

        _SystemUnderTest.setValue(expected, key1, key2);

        var actual = _SystemUnderTest.getValue(key1, key2);

        expect(actual).toBe(expected);
    });

    it('Set new value in json: third level', () => {
        _SystemUnderTest.open(_PathToAppSettingsFileWithoutValues);

        var key1 = 'newLevel1';
        var key2 = 'newLevel2';
        var key3 = 'newLevel3Value';
        var expected = 'updated value';

        _SystemUnderTest.setValue(expected, key1, key2, key3);

        var actual = _SystemUnderTest.getValue(key1, key2, key3);

        expect(actual).toBe(expected);
    });
});
