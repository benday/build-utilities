using System;

namespace Benday.BuildUtilities.Core.Tests
{
    public abstract class CommandFixtureBase : UnitTestBase
    {

        public CommandFixtureBase()
        {

        }

        protected string[] Args { get; set; }

        protected abstract string CommandNameArgument { get; }
    }
}
