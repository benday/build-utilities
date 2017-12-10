using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class SetXmlAttributeCommandFixture : CommandFixtureBase
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            // _SystemUnderTest = null;
            _PathToSampleConfigFile = CreateSampleConfigFile();
            _SystemUnderTest = null;
            Args = null;
        }

        string _PathToSampleConfigFile;

        private SetXmlAttributeCommand _SystemUnderTest;
        public SetXmlAttributeCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new SetXmlAttributeCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameSetXmlAttribute;
            }
        }

        [TestMethod]
        public void SetAttributeUsingThreeLevelsOfElement()
        {
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameLevel1, "configuration"),
                GetArgEntry(Constants.ArgumentNameLevel2, "system.webServer"),
                GetArgEntry(Constants.ArgumentNameLevel3, "aspNetCore"),
                GetArgEntry(Constants.ArgumentNameAttributeName, "processPath"),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            string xpath = "//system.webServer/aspNetCore/@processPath";
            var actual = XmlEditorUtility.GetValueByXPath(_PathToSampleConfigFile, xpath);

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }
    }
}
