using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System.Diagnostics;

namespace Benday.BuildUtilities.Core.Tests
{
    public class UnitTestBase
    {
        public TestContext TestContext
        {
            get; set;
        }

        protected string GetArgEntry(string argumentName, string value)
        {
            return String.Format("/{0}:{1}", argumentName, value);
        }

        protected string[] CreateArgsArray(params string[] args)
        {
            return args;
        }

        protected string CreateSampleJsonConfigFileEmpty()
        {
            string filename = "sample-appsettings-empty.json";

            string path =
                Path.Combine(
                    Path.GetTempPath(),
                    "bendaybuildutilitiescore",
                    DateTime.UtcNow.Ticks.ToString(),
                TestContext.FullyQualifiedTestClassName,
                TestContext.TestName,
                filename);

            Trace.WriteLine("Path to sample config file '{0}'.", path);

            string dirPath = Path.GetDirectoryName(path);

            if (Directory.Exists(dirPath) == false)
            {
                Directory.CreateDirectory(dirPath);
            }

            File.WriteAllText(path, UnitTestResources.SampleJsonAppSettingsEmpty);

            return path;
        }

        protected string CreateSampleJsonConfigFile()
        {
            string filename = "sample-appsettings.json";

            string path =
                Path.Combine(
                    Path.GetTempPath(),
                    "bendaybuildutilitiescore", 
                    DateTime.UtcNow.Ticks.ToString(),
                TestContext.FullyQualifiedTestClassName,
                TestContext.TestName,
                filename);

            string dirPath = Path.GetDirectoryName(path);

            if (Directory.Exists(dirPath) == false)
            {
                Directory.CreateDirectory(dirPath);
            }

            File.WriteAllText(path, UnitTestResources.SampleJsonAppSettings);

            return path;
        }

        protected string CreateSampleConfigFile()
        {
            string filename = "sample-config-file.xml";

            string path =
                Path.Combine(
                    Path.GetTempPath(),
                    "bendaybuildutilitiescore",
                    DateTime.UtcNow.Ticks.ToString(), 
                TestContext.FullyQualifiedTestClassName,
                TestContext.TestName,
                filename);

            Trace.WriteLine("Path to sample config file '{0}'.", path);

            string dirPath = Path.GetDirectoryName(path);

            if (Directory.Exists(dirPath) == false)
            {
                Directory.CreateDirectory(dirPath);
            }

            File.WriteAllText(path, UnitTestResources.SampleConfigFile);

            return path;
        }
    }
}
