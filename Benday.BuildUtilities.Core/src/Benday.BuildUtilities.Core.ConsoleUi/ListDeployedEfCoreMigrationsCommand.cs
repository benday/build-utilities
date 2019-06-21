using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Benday.BuildUtilities.Core.ConsoleUi
{
    public class ListDeployedEfCoreMigrationsCommand : CommandBase
    {
        public ListDeployedEfCoreMigrationsCommand(string[] args) : base(args)
        {

        }

        protected override string CommandArgumentName
        {
            get
            {
                return Constants.CommandArgumentNameListDeployedEfCoreMigrations;
            }
        }

        protected override List<string> GetRequiredArguments()
        {
            var argumentNames = new List<string>();

            argumentNames.Add(Constants.ArgumentNameConnectionString);

            return argumentNames;
        }

        protected override void AfterValidateArguments()
        {
            
        }

        protected override void DisplayUsage(StringBuilder builder)
        {
            base.DisplayUsage(builder);

            string usageString =
                String.Format("{0} {1} /{2}:connection-string [/{3}]",
                Constants.ExeName,
                CommandArgumentName,
                Constants.ArgumentNameConnectionString,
                Constants.ArgumentNameDebug);

            builder.AppendLine(usageString);
        }

        public List<string> GetResult()
        {
            var connectionString = Arguments[Constants.ArgumentNameConnectionString];
            var query = GetQuery();
            List<string> returnValues = null;

            if (ArgNameExists(Constants.ArgumentNameDebug) == true)
            {
                Console.WriteLine("Connection string: {0}", connectionString);
            }

            using(var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        returnValues = GetMigrationNames(reader);
                    }
                }
            }

            if (returnValues == null)
            {
                return new List<string>();
            }
            else
            {
                return returnValues;
            }
        }

        private List<string> GetMigrationNames(SqlDataReader reader)
        {
            if (reader.HasRows == false)
            {
                return new List<string>();
            }
            else
            {
                var returnValues = new List<string>();

                while (reader.Read())
                {
                    returnValues.Add(GetMigrationName(reader.GetString(0)));
                }

                return returnValues;
            }
        }

        private string GetMigrationName(string value)
        {
            if (value == null)
            {
                throw new InvalidOperationException("Migration value was null.");
            }
            else
            {
                if (value.Contains("_") == false)
                {
                    return value;
                }
                else
                {
                    var indexOfUnderscore = value.IndexOf("_", StringComparison.CurrentCulture);

                    return value.Substring(indexOfUnderscore + 1);
                }
            }
        }

        private string GetQuery()
        {
            return "SELECT [MigrationId] FROM [__EFMigrationsHistory] ORDER BY MigrationId";
        }

        public List<string> DeployedMigrations { get; private set; }

        public override void Run()
        {
            Console.WriteLine();

            DeployedMigrations = GetResult();

            foreach (var item in DeployedMigrations)
            {
                Console.WriteLine(item);
            }
        }
    }
}
