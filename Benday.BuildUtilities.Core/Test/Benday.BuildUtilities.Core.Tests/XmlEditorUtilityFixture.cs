using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class XmlEditorUtilityFixture : UnitTestBase
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _PathToSampleConfigFile = CreateSampleConfigFile();
        }

        string _PathToSampleConfigFile;

        [TestMethod]
        public void GetAttributeValueUsingXPath()
        {
            string xpath = "//system.webServer/aspNetCore/@processPath";

            var expected = "aspnetcore.processpath";

            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void GetElementValueUsingXPath()
        {
            string xpath = "//subelement1/subelement2";

            var expected = "subelement2.value";

            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void SetElementValueForNewElement()
        {
            string xpath = "//childelement1/childelement2";

            var expected = "childelement2.value";

            XmlEditorUtility.SetElementValue(
                _PathToSampleConfigFile, 
                "configuration", "childelement1", "childelement2", expected);

            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void SetAttribueValueForExistingElement_ThreeLevels()
        {
            string xpath = "//system.webServer/aspNetCore/@processPath";

            var expected = "new value";

            XmlEditorUtility.SetAttributeValue(
                _PathToSampleConfigFile,
                "configuration", "system.webServer", "aspNetCore", 
                "processPath", expected);

            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void SetAttribueValueForExistingElement_TwoLevels()
        {
            string xpath = "//system.webServer/@processPath";

            var expected = "new value";

            XmlEditorUtility.SetAttributeValue(
                _PathToSampleConfigFile,
                "configuration", "system.webServer", 
                "processPath", expected);

            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }
    }
}
