using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class JsonEditorFixture : UnitTestBase
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _SystemUnderTest = null;
            _PathToSampleConfigFile = null;
        }

        string _PathToSampleConfigFile;

        private void InitializeWithEmptyJson()
        {
            _PathToSampleConfigFile = CreateSampleJsonConfigFileEmpty();

            _SystemUnderTest = new JsonEditor(_PathToSampleConfigFile);
        }

        private void InitializeWithPopulatedJson()
        {
            _PathToSampleConfigFile = CreateSampleJsonConfigFile();

            Console.WriteLine(_PathToSampleConfigFile);

            _SystemUnderTest = new JsonEditor(_PathToSampleConfigFile);
        }

        private JsonEditor _SystemUnderTest;
        public JsonEditor SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    throw new InvalidOperationException(
                        "System under test has not been initialized yet.");
                }

                return _SystemUnderTest;
            }
        }

        [TestMethod]
        public void GetValue_OneLevel()
        {
            InitializeWithPopulatedJson();

            var expected = "FirstLevelValue";

            var actual = SystemUnderTest.GetValue(
                "FirstLevel");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void GetValue_TwoLevels()
        {
            InitializeWithPopulatedJson();

            var expected = "default-connection-string-value";

            var actual = SystemUnderTest.GetValue(
                "ConnectionStrings", "DefaultConnectionString");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void GetValue_ThreeLevels()
        {
            InitializeWithPopulatedJson();

            var expected = "Debug";

            var actual = SystemUnderTest.GetValue(
                "Logging", "LogLevel", "Default");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }


        [TestMethod]
        public void Json_NewValue_SetValue_OneLevel()
        {
            InitializeWithEmptyJson();

            var expected = "new value";

            SystemUnderTest.SetValue(
                expected, "FirstLevel");

            var actual = SystemUnderTest.GetValue(
                "FirstLevel");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void Json_NewValue_SetValue_TwoLevels()
        {
            InitializeWithEmptyJson();

            var expected = "new value";

            SystemUnderTest.SetValue(
                expected, "FirstLevel", "Sub1");

            SystemUnderTest.SetValue(
                expected, "FirstLevel", "Sub2");

            var actual = SystemUnderTest.GetValue(
                "FirstLevel", "Sub1");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");

            var actual2 = SystemUnderTest.GetValue(
                "FirstLevel", "Sub2");

            Assert.AreEqual<string>(expected, actual2, "Wrong value.");
        }

        [TestMethod]
        public void Json_ExistingValue_SetValue_OneLevel()
        {
            InitializeWithPopulatedJson();

            var expected = "new-FirstLevelValue";

            SystemUnderTest.SetValue(
                expected, "FirstLevel");

            var actual = SystemUnderTest.GetValue(
                "FirstLevel");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void Json_ExistingValues_SetValue_DoesNotClobberUnrelatedValues()
        {
            InitializeWithPopulatedJson();

            var original =
                SystemUnderTest.GetValue(
                    "ConnectionStrings", "DefaultConnectionString");

            UnitTestUtility.AssertIsNotNullOrEmptyString(original, "Original value");


            SystemUnderTest.SetValue(
                    "val1", "ConnectionStrings", "conn1");

            SystemUnderTest.SetValue(
                    "val2", "ConnectionStrings", "conn2");
            
            var actual1 = SystemUnderTest.GetValue("ConnectionStrings", "conn1");
            var actual2 = SystemUnderTest.GetValue("ConnectionStrings", "conn2");

            Assert.AreEqual<string>("val1", actual1, "Wrong value.");
            Assert.AreEqual<string>("val2", actual2, "Wrong value.");


            var reloaded =
                SystemUnderTest.GetValue(
                    "ConnectionStrings", "DefaultConnectionString");

            Assert.AreEqual<string>(original, reloaded, "Original value got messed with.");
        }


        [TestMethod]
        public void Json_NewValues_SetValue_ConnectionStrings()
        {
            InitializeWithEmptyJson();

            SystemUnderTest.SetValue(
                    "val1", "ConnectionStrings", "conn1");

            SystemUnderTest.SetValue(
                    "val2", "ConnectionStrings", "conn2");

            var actual1 = SystemUnderTest.GetValue("ConnectionStrings", "conn1");
            var actual2 = SystemUnderTest.GetValue("ConnectionStrings", "conn2");

            Assert.AreEqual<string>("val1", actual1, "Wrong value.");
            Assert.AreEqual<string>("val2", actual2, "Wrong value.");
        }


        [TestMethod]
        public void Json_ExistingValue_SetValue_TwoLevels()
        {
            InitializeWithPopulatedJson();

            var expected = "new-default-connection-string-value";

            SystemUnderTest.SetValue(
                expected, "ConnectionStrings", "DefaultConnectionString");

            var actual = SystemUnderTest.GetValue(
                "ConnectionStrings", "DefaultConnectionString");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void Json_ExistingValue_SetValue_ThreeLevels()
        {
            InitializeWithPopulatedJson();

            var expected = "new-Debug";

            SystemUnderTest.SetValue(
                expected, "Logging", "LogLevel", "Default");

            var actual = SystemUnderTest.GetValue(
                "Logging", "LogLevel", "Default");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }

        [TestMethod]
        public void Json_ExistingValue_SetValue_ThreeLevels_v2()
        {
            InitializeWithPopulatedJson();

            var expected = "new-Debug";

            SystemUnderTest.SetValue(
                expected, 
                "Logging", "LogLevel", "Default");

            var actual = SystemUnderTest.GetValue(                
                "Logging", "LogLevel", "Default");

            Assert.AreEqual<string>(expected, actual, "Wrong value.");
        }
    }
}
