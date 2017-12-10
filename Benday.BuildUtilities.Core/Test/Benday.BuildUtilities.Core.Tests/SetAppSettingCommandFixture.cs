using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using Benday.BuildUtilities.Core.ConsoleUi;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class SetAppSettingCommandFixture : CommandFixtureBase
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

        private SetAppSettingCommand _SystemUnderTest;
        public SetAppSettingCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new SetAppSettingCommand(Args);
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
        public void WhenAppSettingDoesNotExistItIsCreated()
        {
            string keyname = "bogus-keyname";
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameKey, keyname),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            string actual = AppConfigUtility.GetAppSetting(_PathToSampleConfigFile, keyname);
            
            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }

        [TestMethod]
        public void WhenAppSettingExistsUpdateTheValue()
        {
            string keyname = "SettingWithAValue";
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameKey, keyname),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            string actual = AppConfigUtility.GetAppSetting(_PathToSampleConfigFile, keyname);

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }
    }
}
