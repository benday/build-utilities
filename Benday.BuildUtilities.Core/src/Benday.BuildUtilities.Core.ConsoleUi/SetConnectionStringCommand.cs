﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class SetConnectionStringCommand : CommandBase
    {
        public SetConnectionStringCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameSetConnectionString;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameConnectionStringName);
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
                String.Format("{0} {1} /{2}:configfile /{3}:connectionname /{4}:connectionstring",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameConnectionStringName,
                Constants.ArgumentNameValue);

            builder.AppendLine(usageString);
        }

        public override void Run()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var configKeyname = Arguments[Constants.ArgumentNameConnectionStringName];
            var configValue = Arguments[Constants.ArgumentNameValue];

            DatabaseConfigurationUtility.SetConnectionString(
                configFilename, configKeyname, configValue);
        }
    }
}
