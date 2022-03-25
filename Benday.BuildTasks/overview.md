# Build & Release Tools #

When you're doing builds and releases some things are kind of painful...or at least annoying.  This extension has some tasks that you can use to help make your life a little easier.

Once you install this extension, you'll see the following tasks when you open the Build/Release Task Catalog and go to the Utility section.  

NOTE: this task requires .NET Core 3.1 or higher to be installed on your build agent.

Here are the tasks:

1. **Deploy Entity Framework Core Migrations from a DLL**

   Entity Framework Core (EF Core) Migrations are simple to deploy if you have the source code.  But if you want to deploy EF Core migrations from an Azure DevOps Release, you almost definitely don't have access to the source code and you're trying to deploy your EF Core migrations using your already compiled DLLs.  This task helps you to easily deploy your EF Core Migrations from a DLL.  By default, it deploys all your migrations but you can also deploy a specific migration by supplying the migration name.  
   
   NOTE: Because of how EF Core works, this task has no control over your connection string.  You'll need to set your connection string in your appsettings.json (or wherever your EF Core application loads its connection string from) BEFORE you run this task.  For best results, you should [add an implementation of IDesignTimeDbContextFactory to your project](https://www.benday.com/2017/12/19/ef-core-2-0-migrations-without-hard-coded-connection-strings/).

2. **Set Connection String in appsettings.json**

   This task helps you edit connection string in .NET Core applications and ASP.NET Core web apps.  Choose the path to your appsettings.json file, provide the name of the connection string, and provide the new connection string value.  This task will edit the file to either create or update that named connection string in the json-based config.

3. **Set Property Value in JSON File**

   This task helps you to set property values in a JSON file.  This is useful for when you need to set configuration values in 
   appsettings.json.  Values can be nested in the JSON hierarchy up to 3 levels deep.  

4. **Run SQL Script using SqlCmd**

   This task lets you run the contents of a .sql file against SQL Server.  SqlCmd must already be installed on your build agent for this to work.  (BTW, did you know that you can install SqlCmd on MacOS and Linux?)

5. **Set Connection String in App.config or Web.config**

   This is helpful for editing connection strings for applications that run on the .NET Framework and for ASP.NET web applications that run on the .NET Framework.  Choose the path to your app.config or web.config file, provide the name of the connection string you want to set, and provide the new connection string value.  This task will edit the file to either create or update that named connection string in the XML-based config.  

6. **Set AppSettings Value in App.config or Web.config**

   This task helps you to set <appsettings> values in app.config and web.config files.  Choose the path to your app.config or web.config file, provide the key name for the appsetting, and provide the value for the appsetting.  This task will edit the file and either create a new appsettings value or update an existing appsettings value.  

[Follow us on Twitter](https://twitter.com/benday) and if you're feeling especially motivated, come visit our [website](https://www.benday.com/) and [blog](https://www.benday.com/blog/). 

Running into problems? [Email us at info@benday.com](mailto:info@benday.com)

You can also view the code for this extension on [GitHub](https://github.com/benday/build-utilities).
