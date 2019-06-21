using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public static class XmlEditorUtility
    {
        public static string GetValueByXPath(string filename, string xpath)
        {
            if (string.IsNullOrEmpty(filename))
                throw new ArgumentException($"{nameof(filename)} is null or empty.", nameof(filename));
            if (string.IsNullOrEmpty(xpath))
                throw new ArgumentException($"{nameof(xpath)} is null or empty.", nameof(xpath));
            
            XElement root = XElement.Parse(File.ReadAllText(filename));
            var temp = new System.Xml.XPath.XPathDocument(filename);

            var navigator = temp.CreateNavigator();

            var match = navigator.SelectSingleNode(xpath);

            if (match == null)
            {
                return null;
            }
            else
            {
                return match.Value;

                /*
                if (match is XAttribute)
                {
                    return ((XAttribute)match).Value;
                }
                else if (match is XElement)
                {
                    return ((XElement)match).Value;
                }
                else
                {
                    throw new InvalidOperationException(
                        String.Format("Unsupported object type '{0}'.", 
                        match.GetType().FullName));
                }
                */
            }

        }
        
        public static void SetElementValue(
            string filename, 
            string rootElementName, 
            string firstChildName, 
            string secondChildName, 
            string value)
        {
            if (string.IsNullOrEmpty(filename))
                throw new ArgumentException($"{nameof(filename)} is null or empty.", nameof(filename));
            if (string.IsNullOrEmpty(rootElementName))
                throw new ArgumentException($"{nameof(rootElementName)} is null or empty.", nameof(rootElementName));
            if (string.IsNullOrEmpty(firstChildName))
                throw new ArgumentException($"{nameof(firstChildName)} is null or empty.", nameof(firstChildName));
            if (string.IsNullOrEmpty(secondChildName))
                throw new ArgumentException($"{nameof(secondChildName)} is null or empty.", nameof(secondChildName));
            if (string.IsNullOrEmpty(value))
                throw new ArgumentException($"{nameof(value)} is null or empty.", nameof(value));

            XElement root = XElement.Parse(File.ReadAllText(filename));

            if (root.Name != rootElementName)
            {
                throw new InvalidOperationException("Unexpected root element name.");
            }

            var firstChild = root.Element(firstChildName);

            if (firstChild == null)
            {
                firstChild = new XElement(firstChildName);
                root.Add(firstChild);
            }

            var secondChild = root.Element(secondChildName);

            if (secondChild == null)
            {
                secondChild = new XElement(secondChildName);
                firstChild.Add(secondChild);
            }

            secondChild.Value = value;

            File.WriteAllText(filename, root.ToString());
        }

        public static void SetAttributeValue(
            string filename,
            string rootElementName,
            string firstChildName,
            string secondChildName,
            string attributeName, 
            string value)
        {
            if (string.IsNullOrEmpty(filename))
                throw new ArgumentException($"{nameof(filename)} is null or empty.", nameof(filename));
            if (string.IsNullOrEmpty(rootElementName))
                throw new ArgumentException($"{nameof(rootElementName)} is null or empty.", nameof(rootElementName));
            if (string.IsNullOrEmpty(firstChildName))
                throw new ArgumentException($"{nameof(firstChildName)} is null or empty.", nameof(firstChildName));
            if (string.IsNullOrEmpty(secondChildName))
                throw new ArgumentException($"{nameof(secondChildName)} is null or empty.", nameof(secondChildName));
            if (string.IsNullOrEmpty(attributeName))
                throw new ArgumentException($"{nameof(attributeName)} is null or empty.", nameof(attributeName));
            if (string.IsNullOrEmpty(value))
                throw new ArgumentException($"{nameof(value)} is null or empty.", nameof(value));

            XElement root = XElement.Parse(File.ReadAllText(filename));

            if (root.Name != rootElementName)
            {
                throw new InvalidOperationException("Unexpected root element name.");
            }

            var firstChild = root.Element(firstChildName);

            if (firstChild == null)
            {
                firstChild = new XElement(firstChildName);
                root.Add(firstChild);
            }

            var secondChild = firstChild.Element(secondChildName);

            if (secondChild == null)
            {
                secondChild = new XElement(secondChildName);
                firstChild.Add(secondChild);
            }

            secondChild.SetAttributeValue(attributeName, value);

            File.WriteAllText(filename, root.ToString());
        }

        public static void SetAttributeValue(
    string filename,
    string rootElementName,
    string firstChildName,
    string attributeName,
    string value)
        {
            if (string.IsNullOrEmpty(filename))
                throw new ArgumentException($"{nameof(filename)} is null or empty.", nameof(filename));
            if (string.IsNullOrEmpty(rootElementName))
                throw new ArgumentException($"{nameof(rootElementName)} is null or empty.", nameof(rootElementName));
            if (string.IsNullOrEmpty(firstChildName))
                throw new ArgumentException($"{nameof(firstChildName)} is null or empty.", nameof(firstChildName));
            
            if (string.IsNullOrEmpty(attributeName))
                throw new ArgumentException($"{nameof(attributeName)} is null or empty.", nameof(attributeName));
            if (string.IsNullOrEmpty(value))
                throw new ArgumentException($"{nameof(value)} is null or empty.", nameof(value));

            XElement root = XElement.Parse(File.ReadAllText(filename));

            if (root.Name != rootElementName)
            {
                throw new InvalidOperationException("Unexpected root element name.");
            }

            var firstChild = root.Element(firstChildName);

            if (firstChild == null)
            {
                firstChild = new XElement(firstChildName);
                root.Add(firstChild);
            }

            firstChild.SetAttributeValue(attributeName, value);

            File.WriteAllText(filename, root.ToString());
        }

        private static object GetFirstItem(IEnumerable enumerable)
        {
            if (enumerable == null)
            {
                return null;
            }
            else
            {
                foreach (object item in enumerable)
                {
                    return item;
                }

                return null;
            }
        }
    }
}
