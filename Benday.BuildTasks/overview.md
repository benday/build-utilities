# Build & Release Tools
A collection of useful tools for Azure DevOps build and release pipelines.

Written by Benjamin Day  
Microsoft MVP | Azure DevOps & GitHub Specialist  
https://www.benday.com  
info@benday.com  

*Got ideas for Azure DevOps utilities you'd like to see? Found a bug? Let us know by submitting an issue https://github.com/benday/build-utilities/issues*. *Want to contribute? Submit a pull request.*

When you're doing builds and releases some things are kind of painful...or at least annoying. This extension has some tasks that you can use to help make your life a little easier.

Once you install this extension, you'll see the following tasks when you open the Build/Release Task Catalog and go to the Utility section.  

NOTE: the app.config tasks require .NET Core 10.0 or higher to be installed on your build agent.

## Tasks in Build & Release Tools:

1. **Deploy Entity Framework Core Migrations from a DLL**

   Entity Framework Core (EF Core) Migrations are simple to deploy if you have the source code. But if you want to deploy EF Core migrations from an Azure DevOps Release, you almost definitely don't have access to the source code and you're trying to deploy your EF Core migrations using your already compiled DLLs. This task helps you to easily deploy your EF Core Migrations from a DLL. By default, it deploys all your migrations but you can also deploy a specific migration by supplying the migration name.  
   
   NOTE: Because of how EF Core works, this task has no control over your connection string. You'll need to set your connection string in your appsettings.json (or wherever your EF Core application loads its connection string from) BEFORE you run this task. For best results, you should [add an implementation of IDesignTimeDbContextFactory to your project](https://www.benday.com/2017/12/19/ef-core-2-0-migrations-without-hard-coded-connection-strings/).

2. **Set Connection String in appsettings.json**

   This task helps you edit connection string in .NET Core applications and ASP.NET Core web apps. Choose the path to your appsettings.json file, provide the name of the connection string, and provide the new connection string value. This task will edit the file to either create or update that named connection string in the json-based config.

3. **Set Property Value or Array Value in JSON File**

   This task helps you to set property values in a JSON file. This is useful for when you need to set configuration values in appsettings.json. Values can be nested in the JSON hierarchy up to 4 levels deep. This has the option to set the value as a property or as an array.

   If you want to set it as an array, you'll set the setValueAsArray property to true and then you can set up to 10 values into the array.

4. **Run SQL Script using SqlCmd**

   This task lets you run the contents of a .sql file against SQL Server. SqlCmd must already be installed on your build agent for this to work. (BTW, did you know that you can install SqlCmd on MacOS and Linux?)

5. **Set Connection String in App.config or Web.config**

   This is helpful for editing connection strings for applications that run on the .NET Framework and for ASP.NET web applications that run on the .NET Framework. Choose the path to your app.config or web.config file, provide the name of the connection string you want to set, and provide the new connection string value. This task will edit the file to either create or update that named connection string in the XML-based config.  

6. **Set AppSettings Value in App.config or Web.config**

   This task helps you to set <appsettings> values in app.config and web.config files. Choose the path to your app.config or web.config file, provide the key name for the appsetting, and provide the value for the appsetting. This task will edit the file and either create a new appsettings value or update an existing appsettings value.  

---

## Other Extensions from Benjamin Day Consulting

**[Honest Cheetah for Azure DevOps](https://www.honestcheetah.com)** - Stop guessing when work will be done. Flow metrics and Monte Carlo forecasting right in your Boards hub. Uses your existing Azure DevOps data to forecast delivery - no story points required. Free to install.

---

## Other Utilities

You might also be interested in some of our other projects:
- **[azdoutil](https://github.com/benday-inc/azdoutil)** - Command line utilities for Azure DevOps administration
- **[slnutil](https://github.com/benday-inc/slnutil)** - Command line utilities for .NET solution file management

---

## Learn More

Check out the [Benjamin Day Consulting YouTube channel](https://www.youtube.com/@benday) for tutorials on Azure DevOps, GitHub, .NET development, and delivery practices.

---

## Need Help?

Projects don't fail because of technology - they fail because of communication, priorities, and process. Benjamin Day Consulting helps teams diagnose what's actually broken and get stalled projects back on track.

[Visit www.benday.com](https://www.benday.com) | [Email info@benday.com](mailto:info@benday.com)

You can also view the code for this extension on [GitHub](https://github.com/benday/build-utilities).