using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class ReplaceTokenCommandFixture : CommandFixtureBase
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

        private ReplaceTokenCommand _SystemUnderTest;
        public ReplaceTokenCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new ReplaceTokenCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameReplaceToken;
            }
        }

        [TestMethod]
        public void WhenTokenDoesNotExistTheFileContentsDontChange()
        {
            string token = "bogus-keyname";
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameToken, token),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            string expected = File.ReadAllText(_PathToSampleConfigFile);

            Assert.IsFalse(expected.Contains(token), "Token should not exist in original.");

            SystemUnderTest.Run();

            string actual = File.ReadAllText(_PathToSampleConfigFile);

            Assert.AreEqual<string>(expected, actual, "The file shouldn't change.");
        }

        [TestMethod]
        public void WhenAppSettingExistsUpdateTheValue()
        {
            string token = "%%token%%";
            string expectedValue = "replaced-token-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameToken, token),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            string originalText = File.ReadAllText(_PathToSampleConfigFile);

            Assert.IsTrue(originalText.Contains(token), "Token does not exist in original.");

            SystemUnderTest.Run();

            string actual = File.ReadAllText(_PathToSampleConfigFile);

            Assert.AreNotEqual<string>(originalText, actual, "The file shouldn't change.");

            Assert.IsFalse(actual.Contains(token), 
                "Token should not exist in modified.");

            Assert.IsTrue(actual.Contains(expectedValue),
                "Token replacement value should exist in modified.");
        }
    }
}
