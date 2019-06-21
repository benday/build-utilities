using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class GetConnectionStringCommand : CommandBase
    {
        public GetConnectionStringCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameGetConnectionString;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameConnectionStringName);

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
                String.Format("{0} {1} /{2}:configfile /{3}:connectionname",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameConnectionStringName);

            builder.AppendLine(usageString);
        }

        public string GetResult()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var connectionName = Arguments[Constants.ArgumentNameConnectionStringName];
            
            return DatabaseConfigurationUtility.GetConnectionString(
                configFilename, connectionName);
        }

        public override void Run()
        {
            Console.WriteLine();
            Console.WriteLine(GetResult());
        }
    }    
}
