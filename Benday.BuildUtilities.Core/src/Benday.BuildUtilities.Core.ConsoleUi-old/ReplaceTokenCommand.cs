using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class ReplaceTokenCommand : CommandBase
    {
        public ReplaceTokenCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameReplaceToken;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameToken);
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
                String.Format("{0} {1} /{2}:configfile /{3}:token /{4}:connectionstring",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameToken,
                Constants.ArgumentNameValue);

            builder.AppendLine(usageString);
        }

        public override void Run()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var configToken = Arguments[Constants.ArgumentNameToken];
            var configValue = Arguments[Constants.ArgumentNameValue];

            var text = File.ReadAllText(configFilename);

            if (text.Contains(configToken) == true)
            {
                text = text.Replace(configToken, configValue);

                File.WriteAllText(configFilename, text);
            }
        }
    }
}
