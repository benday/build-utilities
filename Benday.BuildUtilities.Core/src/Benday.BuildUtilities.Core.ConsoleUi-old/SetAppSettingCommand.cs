using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class SetAppSettingCommand : CommandBase
    {
        public SetAppSettingCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameSetAppSetting;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameKey);
            argumentNames.Add(Constants.ArgumentNameValue);

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
                String.Format("{0} {1} /{2}:configfile /{3}:keyname /{4}:connectionstring",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameKey, 
                Constants.ArgumentNameValue);

            builder.AppendLine(usageString);
        }

       public override void Run()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var configKeyname = Arguments[Constants.ArgumentNameKey];
            var configValue = Arguments[Constants.ArgumentNameValue];

            AppConfigUtility.SetAppSetting(configFilename, configKeyname, configValue);
        }
    }
}
