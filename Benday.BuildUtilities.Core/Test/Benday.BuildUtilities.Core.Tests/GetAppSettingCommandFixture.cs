using Benday.BuildUtilities;
using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class GetAppSettingCommandFixture : CommandFixtureBase
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

        private GetAppSettingCommand _SystemUnderTest;
        public GetAppSettingCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new GetAppSettingCommand(Args);
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
        public void WhenAppSettingDoesNotExistThenReturnNull()
        {
            string keyname = "bogus-keyname";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameKey, keyname));

            string actual = SystemUnderTest.GetResult();
            string expected = null;

            Assert.AreEqual<string>(expected, actual, "Result was wrong.");
        }

        [TestMethod]
        public void WhenAppSettingExistsThenReturnValue()
        {
            string keyname = "SettingWithAValue";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameKey, keyname));

            string actual = SystemUnderTest.GetResult();
            string expected = "this is a value";

            Assert.AreEqual<string>(expected, actual, "Result was wrong.");
        }
    }
}
