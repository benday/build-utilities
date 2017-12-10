using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.BuildUtilities.Core.Tests
{
    public static class UnitTestUtility
    {
        public static void AssertIsNotNullOrEmptyString(string actual, string itemName)
        {
            Assert.IsNotNull(actual, "Value for '{0}' should not be null.", itemName);

            Assert.AreNotEqual<string>(String.Empty, actual,
                "Value for '{0}' should not be empty.",
                itemName);
        }
    }
}
