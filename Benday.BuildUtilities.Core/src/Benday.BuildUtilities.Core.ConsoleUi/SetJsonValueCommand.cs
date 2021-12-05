using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class SetJsonValueCommand : CommandBase
    {
        public SetJsonValueCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameSetJsonValue;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameLevel1);
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
                String.Format(
"{0} {1} /{2}:configfile /{3}:elementname [/{4}:elementname] [/{5}:elementname] /{6}:newvalue ",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameLevel1,
                Constants.ArgumentNameLevel2,
                Constants.ArgumentNameLevel3,
                Constants.ArgumentNameValue);

            builder.AppendLine(usageString);
        }

        public override void Run()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var newValue = Arguments[Constants.ArgumentNameValue];
            var level1 = Arguments[Constants.ArgumentNameLevel1];
            string level2 = null;
            string level3 = null;
            string level4 = null;
            
            var editor = new JsonEditor(configFilename);

            if (ArgNameExists(Constants.ArgumentNameLevel2) == true &&
                ArgNameExists(Constants.ArgumentNameLevel3) == true &&
                ArgNameExists(Constants.ArgumentNameLevel4) == true)
            {
                level2 = Arguments[Constants.ArgumentNameLevel2];
                level3 = Arguments[Constants.ArgumentNameLevel3];
                level4 = Arguments[Constants.ArgumentNameLevel4];
                
                editor.SetValue(
                    newValue, level1, level2, level3, level4);
            }
            else if (ArgNameExists(Constants.ArgumentNameLevel2) == true &&
                ArgNameExists(Constants.ArgumentNameLevel3) == true)
            {
                level2 = Arguments[Constants.ArgumentNameLevel2];
                level3 = Arguments[Constants.ArgumentNameLevel3];
                
                editor.SetValue(
                    newValue, level1, level2, level3);
            }
            else if (ArgNameExists(Constants.ArgumentNameLevel2) == true &&
                ArgNameExists(Constants.ArgumentNameLevel3) == false)
            {
                level2 = Arguments[Constants.ArgumentNameLevel2];
                
                editor.SetValue(
                    newValue,
                    level1, level2);
            }
            else
            {
                editor.SetValue(
                    newValue,
                    level1);
            }
        }
    }
}
