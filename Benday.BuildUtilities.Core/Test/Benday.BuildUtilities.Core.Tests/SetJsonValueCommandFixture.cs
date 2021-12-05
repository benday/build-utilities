using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class SetJsonValueCommandFixture : CommandFixtureBase
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            // _SystemUnderTest = null;
            _PathToSampleConfigFile = CreateSampleJsonConfigFile();
            _SystemUnderTest = null;
            Args = null;
        }

        string _PathToSampleConfigFile;

        private SetJsonValueCommand _SystemUnderTest;
        public SetJsonValueCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new SetJsonValueCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameSetJsonValue;
            }
        }

        [TestMethod]
        public void SetJsonValueUsingThreeLevelsOfElement()
        {
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameLevel1, "Logging"),
                GetArgEntry(Constants.ArgumentNameLevel2, "LogLevel"),
                GetArgEntry(Constants.ArgumentNameLevel3, "Default"),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            var editor = new JsonEditor(_PathToSampleConfigFile);

            var actual = editor.GetValue(
                "Logging", "LogLevel", "Default");

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }

        [TestMethod]
        public void SetJsonValueUsingFourLevelsOfElement()
        {
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameLevel1, "one"),
                GetArgEntry(Constants.ArgumentNameLevel2, "two"),
                GetArgEntry(Constants.ArgumentNameLevel3, "three"),
                GetArgEntry(Constants.ArgumentNameLevel4, "four"),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            var editor = new JsonEditor(_PathToSampleConfigFile);

            var actual = editor.GetValue(
                "one", "two", "three", "four");

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }

        [TestMethod]
        public void SetJsonValueUsingTwoLevelsOfElement()
        {
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameLevel1, "ConnectionStrings"),
                GetArgEntry(Constants.ArgumentNameLevel2, "DefaultConnectionString"),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            var editor = new JsonEditor(_PathToSampleConfigFile);

            var actual = editor.GetValue(
                "ConnectionStrings", "DefaultConnectionString");

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }

        [TestMethod]
        public void SetJsonValueUsingOneLevelOfElement()
        {
            string expectedValue = "new-value";

            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConfigFilename, _PathToSampleConfigFile),
                GetArgEntry(Constants.ArgumentNameLevel1, "FirstLevel"),
                GetArgEntry(Constants.ArgumentNameAttributeName, "processPath"),
                GetArgEntry(Constants.ArgumentNameValue, expectedValue));

            SystemUnderTest.Run();

            var editor = new JsonEditor(_PathToSampleConfigFile);

            var actual = editor.GetValue(
                "FirstLevel");

            Assert.AreEqual<string>(expectedValue, actual, "Result was wrong.");
        }
    }
}
