using System;
using System.Linq;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public static class Constants
    {
        public static readonly string ExeName = "configutil";

        public static readonly string CommandArgumentNameGetAppSetting = "getappsetting";
        public static readonly string CommandArgumentNameSetAppSetting = "setappsetting";
        public static readonly string CommandArgumentNameReplaceToken = "replacetoken";
        public static readonly string CommandArgumentNameGetConnectionString = "getconnectionstring";
        public static readonly string CommandArgumentNameSetConnectionString = "setconnectionstring";
        public static readonly string CommandArgumentNameSetXmlAttribute = "setxmlattribute";
        public static readonly string CommandArgumentNameSetJsonValue = "setjsonvalue";
        public static readonly string CommandArgumentNameListDeployedEfCoreMigrations = "listmigrations";

        public static readonly string ArgumentNameConfigFilename = "filename";
        public static readonly string ArgumentNameKey = "key";
        public static readonly string ArgumentNameConnectionStringName = "name";
        public static readonly string ArgumentNameValue = "value";
        public static readonly string ArgumentNameToken = "token";
        public static readonly string ArgumentNameLevel1 = "level1";
        public static readonly string ArgumentNameLevel2 = "level2";
        public static readonly string ArgumentNameLevel3 = "level3";
        public static readonly string ArgumentNameAttributeName = "attributename";
        public static readonly string ArgumentNameConnectionString = "connectionstring";
        public static readonly string ArgumentNameDebug = "debug";
    }
}
