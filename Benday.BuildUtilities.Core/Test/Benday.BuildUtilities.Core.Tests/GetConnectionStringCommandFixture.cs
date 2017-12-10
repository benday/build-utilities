using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class GetConnectionStringCommandFixture : CommandFixtureBase
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

        private GetConnectionStringCommand _SystemUnderTest;
        public GetConnectionStringCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new GetConnectionStringCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameGetConnectionString;
            }
        }

        [TestMethod]
        public void WhenConnectionStringDoesNotExistThenReturnNull()
        {
            string connectionName = "bogus-connection-name";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameConnectionStringName, connectionName));

            string actual = SystemUnderTest.GetResult();
            string expected = null;

            Assert.AreEqual<string>(expected, actual, "Result was wrong.");
        }

        [TestMethod]
        public void WhenAppSettingExistsThenReturnValue()
        {
            string connectionName = "(default)";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameConnectionStringName, connectionName));

            string actual = SystemUnderTest.GetResult();
            string expected = "default-connection-string";

            Assert.AreEqual<string>(expected, actual, "Result was wrong.");
        }
    }
}
