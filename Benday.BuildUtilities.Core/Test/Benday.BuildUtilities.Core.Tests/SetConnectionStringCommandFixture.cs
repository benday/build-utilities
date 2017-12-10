using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class SetConnectionStringCommandFixture : CommandFixtureBase
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

        private SetConnectionStringCommand _SystemUnderTest;
        public SetConnectionStringCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new SetConnectionStringCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameGetAppSetting;
            }
        }

        [TestMethod]
        public void WhenConnectionStringDoesNotExistItIsCreated()
        {
            string keyname = "bogus-keyname";
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameConnectionStringName, keyname),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            string actual = DatabaseConfigurationUtility.GetConnectionString(
                _PathToSampleConfigFile, keyname);

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }

        [TestMethod]
        public void WhenConnectionStringExistsUpdateTheValue()
        {
            string keyname = "(default)";
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameConnectionStringName, keyname),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            string actual = DatabaseConfigurationUtility.GetConnectionString(
                _PathToSampleConfigFile, keyname);

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }
    }
}
