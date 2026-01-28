using System;
using System.Collections.Generic;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    class Program
    {
        private static string _VersionNumber = "v1.201802160815";
        
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                DisplayUsage();
            }
            else
            {
                try
                {
                    string commandName = args[0];

                    if (commandName == Constants.CommandArgumentNameGetAppSetting)
                    {
                        new GetAppSettingCommand(args).Run();
                    }
                    else if (commandName ==
                        Constants.CommandArgumentNameSetJsonValue)
                    {
                        new SetJsonValueCommand(args).Run();
                    }
                    else if (commandName == Constants.CommandArgumentNameSetAppSetting)
                    {
                        new SetAppSettingCommand(args).Run();
                    }
                    else if (commandName == Constants.CommandArgumentNameReplaceToken)
                    {
                        new ReplaceTokenCommand(args).Run();
                    }
                    else if (commandName == Constants.CommandArgumentNameGetConnectionString)
                    {
                        new GetConnectionStringCommand(args).Run();
                    }
                    else if (commandName == Constants.CommandArgumentNameSetConnectionString)
                    {
                        new SetConnectionStringCommand(args).Run();
                    }
                    else if (commandName == Constants.CommandArgumentNameSetXmlAttribute)
                    {
                        new SetXmlAttributeCommand(args).Run();
                    }
                    else
                    {
                        DisplayUsage();
                    }
                }
                catch (MissingArgumentException)
                {

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                /* 
                finally
                {
                    Console.WriteLine("Press ENTER to exit...");
                    Console.ReadLine();
                }  
                */
            }
        }

        private static void DisplayUsage()
        {
            string indent = "\t";

            StringBuilder builder = new StringBuilder();

            builder.AppendLine();
            builder.AppendLine("Build & Configuration Utilities for .NET Core");
            builder.AppendLine(_VersionNumber);
            builder.AppendLine("Benjamin Day Consulting, Inc.");
            builder.AppendLine("www.benday.com");
            builder.AppendLine();
            builder.AppendLine("Available commands:");

            var commands = new List<string>();

            commands.Add(Constants.CommandArgumentNameGetAppSetting);
            commands.Add(Constants.CommandArgumentNameSetAppSetting);
            commands.Add(Constants.CommandArgumentNameReplaceToken);
            commands.Add(Constants.CommandArgumentNameGetConnectionString);
            commands.Add(Constants.CommandArgumentNameSetConnectionString);
            commands.Add(Constants.CommandArgumentNameSetXmlAttribute);
            commands.Add(Constants.CommandArgumentNameSetJsonValue);
            
            foreach (var commandName in commands)
            {
                builder.AppendLine(indent + commandName);
            }

            Console.WriteLine(builder.ToString());
        }
    }
}
