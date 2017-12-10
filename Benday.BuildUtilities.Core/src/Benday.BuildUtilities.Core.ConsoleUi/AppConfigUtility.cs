using System;
using System.IO;
using System.Linq;
using System.Xml.Linq;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public static class AppConfigUtility
    {
        public static void SetAppSetting(string configFilename, string key, string value)
        {
            XElement root = XElement.Parse(File.ReadAllText(configFilename));

            if (root.Name != "configuration")
            {
                throw new InvalidOperationException(
                    "This is probably not a config file. Expected root element to be 'configuration'.");
            }

            XElement appSettings = root.ElementByLocalName("appSettings");

            if (appSettings == null)
            {
                appSettings = new XElement("appSettings");

                root.Add(appSettings);
            }

            var configElement =
                appSettings.ElementByLocalNameAndAttributeValue(
                    "add", "key", key);

            if (configElement == null)
            {
                configElement = new XElement("add");

                configElement.SetAttributeValue("key", key);
                configElement.SetAttributeValue("value", value);

                appSettings.Add(configElement);
            }
            else
            {
                configElement.SetAttributeValue("value", value);
            }

            File.WriteAllText(configFilename, root.ToString());
        }

        public static string GetAppSetting(string configFilename, string key)
        {
            XElement root = XElement.Parse(File.ReadAllText(configFilename));

            if (root.Name != "configuration")
            {
                throw new InvalidOperationException(
                    "This is probably not a config file. Expected root element to be 'configuration'.");
            }

            XElement appSettings = root.ElementByLocalName("appSettings");

            if (appSettings == null)
            {
                return null;
            }
            else
            {
                var configElement =
                    appSettings.ElementByLocalNameAndAttributeValue(
                        "add", "key", key);

                if (configElement == null)
                {
                    return null;
                }
                else
                {
                    return configElement.AttributeValue("value");
                }
            }
        }

    }
}
