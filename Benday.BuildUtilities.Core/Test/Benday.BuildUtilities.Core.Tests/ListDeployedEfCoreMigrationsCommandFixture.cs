using System;
using Benday.BuildUtilities.Core.ConsoleUi;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.BuildUtilities.Core.Tests
{
    [TestClass]
    public class ListDeployedEfCoreMigrationsCommandFixture : CommandFixtureBase
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _SystemUnderTest = null;
            Args = null;
        }

        private ListDeployedEfCoreMigrationsCommand _SystemUnderTest;
        public ListDeployedEfCoreMigrationsCommand SystemUnderTest
        {
            get
            {
                if (_SystemUnderTest == null)
                {
                    _SystemUnderTest = new ListDeployedEfCoreMigrationsCommand(Args);
                }

                return _SystemUnderTest;
            }
        }

        protected override string CommandNameArgument
        {
            get
            {
                return Constants.CommandArgumentNameListDeployedEfCoreMigrations;
            }
        }

        [TestMethod]
        [ExpectedException(typeof(MissingArgumentException))]
        public void ThrowsExceptionsFoMrissingArgs()
        {
            Args = CreateArgsArray(
                CommandNameArgument);

            Assert.IsNotNull(SystemUnderTest);
        }

        [TestMethod]
        public void CanBeConstructed()
        {
            Args = CreateArgsArray(
                CommandNameArgument,
                GetArgEntry(Constants.ArgumentNameConnectionString, "fake connection string"));

            Assert.IsNotNull(SystemUnderTest);
        }
    }
}
