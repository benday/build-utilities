using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class SetXmlAttributeCommand : CommandBase
    {
        public SetXmlAttributeCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameSetXmlAttribute;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConfigFilename);
            argumentNames.Add(Constants.ArgumentNameLevel1);
            argumentNames.Add(Constants.ArgumentNameLevel2);
            argumentNames.Add(Constants.ArgumentNameAttributeName);
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
"{0} {1} /{2}:configfile /{3}:elementname /{4}:elementname [/{5}:elementname] /{6}:attributename /{7}:attributevalue",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConfigFilename,
                Constants.ArgumentNameLevel1,
                Constants.ArgumentNameLevel2,
                Constants.ArgumentNameLevel3,
                Constants.ArgumentNameAttributeName,
                Constants.ArgumentNameValue);

            builder.AppendLine(usageString);
        }

        public override void Run()
        {
            var configFilename = Arguments[Constants.ArgumentNameConfigFilename];
            var level1 = Arguments[Constants.ArgumentNameLevel1];
            var level2 = Arguments[Constants.ArgumentNameLevel2];
            var attributeName = Arguments[Constants.ArgumentNameAttributeName];
            var attributeValue = Arguments[Constants.ArgumentNameValue];

            if (ArgNameExists(Constants.ArgumentNameLevel3) == true)
            {
                var level3 = Arguments[Constants.ArgumentNameLevel3];

                XmlEditorUtility.SetAttributeValue(
                    configFilename,
                    level1, level2, level3, attributeName, attributeValue);
            }
            else
            {
                XmlEditorUtility.SetAttributeValue(
                    configFilename,
                    level1, level2, attributeName, attributeValue);
            }            
        }
    }
}
