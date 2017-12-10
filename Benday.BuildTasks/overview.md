# Build & Release Tools #

When you're doing builds and releases some things are kind of painful...or at least annoying.  This extension has some tasks that you can use to help make your life a little easier.

Once you install this extension, you'll see the following tasks when you open the Build/Release Task Catalog and go to the Utility section.  

NOTE: this task requires .NET Core 1.1 or higher to be installed on your build agent.

Here are the tasks:

1. **Set Connection String in App.config or Web.config**

   This is helpful for editing connection strings for applications that run on the .NET Framework and for ASP.NET web applications that run on the .NET Framework.  Choose the path to your app.config or web.config file, provide the name of the connection string you want to set, and provide the new connection string value.  This task will edit the file to either create or update that named connection string in the XML-based config.  

2. **Set Connection String in appsettings.json**

   This task helps you edit connection string in .NET Core applications and ASP.NET Core web apps.  Choose the path to your appsettings.json file, provide the name of the connection string, and provide the new connection string value.  This task will edit the file to either create or update that named connection string in the json-based config.

3. **Set AppSettings Value in App.config or Web.config**

   This task helps you to set <appsettings> values in app.config and web.config files.  Choose the path to your app.config or web.config file, provide the key name for the appsetting, and provide the value for the appsetting.  This task will edit the file and either create a new appsettings value or update an existing appsettings value.  

4. **Deploy Entity Framework Core Migrations from a DLL**

   Entity Framework Core (EF Core) Migrations are simple to deploy if you have the source code.  But if you want to deploy EF Core migrations from a TFS Release, you almost definitely don't have access to the source code and you're trying to deploy your EF Core migrations using your already compiled DLLs.  This task helps you to easily deploy your EF Core 2.0 Migrations from a DLL.    


[Follow us on Twitter](https://twitter.com/benday) and if you're feeling especially motivated, come visit our [website](https://www.benday.com/) and [blog](https://www.benday.com/blog/). 
