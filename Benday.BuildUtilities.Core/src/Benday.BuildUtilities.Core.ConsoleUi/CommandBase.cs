using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public abstract class CommandBase
    {
        public CommandBase(string[] args)
        {
            if (args == null)
                throw new ArgumentException("args is null.", "args");

            _Arguments = GetArgsAsDictionary(args);

            ValidateArguments();
            AfterValidateArguments();
        }

        protected void AssertFileExists(string path, string argumentName)
        {
            if (File.Exists(path) == false)
            {
                string message = String.Format(
                    "File for argument '{0}' was not found.", argumentName);

                throw new FileNotFoundException(
                    message, path);
            }
        }

        protected abstract string CommandArgumentName { get; }

        protected virtual void RaiseExceptionAndDisplayError(bool displayUsage, string message)
        {
            StringBuilder builder = new StringBuilder();

            DisplayUsage(builder);

            builder.AppendLine(message);

            Console.WriteLine(builder.ToString());

            throw new InvalidOperationException(message);
        }

        private void RaiseExceptionAndDisplayErrorForMissingArguments(List<string> missingArgs)
        {
            StringBuilder builder = new StringBuilder();

            DisplayUsage(builder);

            builder.AppendLine();

            builder.AppendLine("Invalid or missing arguments.");

            missingArgs.ForEach(x => builder.AppendLine(String.Format("- '{0}' is required.'", x)));

            Console.WriteLine(builder.ToString());

            throw new MissingArgumentException(builder.ToString());
        }

        protected abstract List<string> GetRequiredArguments();

        protected virtual void ValidateArguments()
        {
            var requiredArguments = GetRequiredArguments();

            if (requiredArguments == null || requiredArguments.Count == 0)
            {
                // nothing to do
            }
            else
            {
                List<string> missingArgs = new List<string>();

                foreach (var requiredArg in requiredArguments)
                {
                    if (ArgNameExists(requiredArg) == false)
                    {
                        missingArgs.Add(requiredArg);
                    }
                }

                if (missingArgs.Count > 0)
                {
                    RaiseExceptionAndDisplayErrorForMissingArguments(missingArgs);
                }
            }

            if (ArgNameExists("version") == true)
            {
                Console.WriteLine("Version 1.0.1");
            }
        }

        protected virtual void AfterValidateArguments()
        {
            
        }

        protected virtual void DisplayUsage(StringBuilder builder)
        {
            builder.AppendLine();
            builder.AppendLine("Build Utilities");
            builder.AppendLine("Benjamin Day Consulting, Inc.");
            builder.AppendLine("www.benday.com");
            builder.AppendLine();
        }

        private Dictionary<string, string> _Arguments;
        public Dictionary<string, string> Arguments
        {
            get
            {
                return _Arguments;
            }
        }

        protected bool ArgNameExists(string argName)
        {
            return ArgNameExists(Arguments, argName);
        }

        private bool ArgNameExists(Dictionary<string, string> args, string argName)
        {
            if (args.ContainsKey(argName) == false)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private void DebugArgDictionary(Dictionary<string, string> argsAsDictionary)
        {
            Console.WriteLine("Valid arg count: {0}", argsAsDictionary.Keys.Count);

            foreach (var key in argsAsDictionary.Keys)
            {
                Console.WriteLine("Arg: '{0}'; Value: '{1}';", key, argsAsDictionary[key]);
            }
        }

        private Dictionary<string, string> GetArgsAsDictionary(string[] args)
        {
            var returnValue = new Dictionary<string, string>();

            foreach (var arg in args)
            {
                if (String.IsNullOrWhiteSpace(arg) == false &&
                    arg.StartsWith("/") == true &&
                    arg.Contains(":") == true)
                {
                    CleanArgAndAddToDictionary(arg, returnValue);
                }
                else if (String.IsNullOrWhiteSpace(arg) == false &&
                    arg.StartsWith("/") == true &&
                    arg.Contains(":") == false)
                {
                    CleanArgWithoutColonAndAddToDictionary(arg, returnValue);
                }
            }

            return returnValue;
        }

        private void CleanArgWithoutColonAndAddToDictionary(string arg, Dictionary<string, string> args)
        {
            var argWithoutSlash = arg.Substring(1).ToLower();

            if (args.ContainsKey(argWithoutSlash) == false)
            {
                args.Add(argWithoutSlash, String.Empty);
            }
        }

        private void CleanArgAndAddToDictionary(string arg, Dictionary<string, string> args)
        {
            var argWithoutSlash = arg.Substring(1);

            int locationOfColon = argWithoutSlash.IndexOf(":");

            var argName = argWithoutSlash.Substring(0, locationOfColon);

            var argValue = argWithoutSlash.Substring(locationOfColon + 1).Trim();

            argValue = RemoveLeadingQuote(argValue);
            argValue = RemoveTrailingQuote(argValue);

            if (args.ContainsKey(argName) == false)
            {
                args.Add(argName, argValue);
            }
        }

        private string RemoveLeadingQuote(string argValue)
        {
            if (argValue.StartsWith("\"") == true)
            {
                return argValue.Substring(1);
            }
            else
            {
                return argValue;
            }
        }

        private string RemoveTrailingQuote(string argValue)
        {
            if (argValue.EndsWith("\"") == true)
            {
                return argValue.Substring(0, argValue.Length - 1);
            }
            else
            {
                return argValue;
            }
        }
        public abstract void Run();
    }
}
