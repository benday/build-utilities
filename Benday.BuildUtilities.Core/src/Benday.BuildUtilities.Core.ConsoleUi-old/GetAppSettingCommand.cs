using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class GetAppSettingCommand : CommandBase
    {
        public GetAppSettingCommand(string[] args) : base(args)
        {
            
        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameGetAppSetting;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameKey);

            return argumentNames;
        }

        protected override void AfterValidateArguments()
        {
            AssertFileExists(
                Arguments[Constants.ArgumentNameConfigFilename],
                Constants.ArgumentNameConfigFilename);
        }

        protected override void DisplayUsage(StringBuilder builder)
        {
            base.DisplayUsage(builder);

            string usageString =
                String.Format("{0} {1} /{2}:configfile /{3}:keyname ",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename, 
                Constants.ArgumentNameKey);

            builder.AppendLine(usageString);
        }

        public string GetResult()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var configKeyname = Arguments[Constants.ArgumentNameKey];

            return AppConfigUtility.GetAppSetting(configFilename, configKeyname);
        }

        public override void Run()
        {
            Console.WriteLine();
            Console.WriteLine(GetResult());
        }
    }
}
