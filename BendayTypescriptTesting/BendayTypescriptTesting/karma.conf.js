module.exports = function(config) {
  config.set({
      frameworks: ["jasmine", "karma-typescript"],
      files: [
        {
          pattern: "**/*.ts",           
        }
      ],
      preprocessors: {
        "**/*.ts": "karma-typescript"
      },
      reporters: ["progress", "karma-typescript"],
      browsers: ["Chrome"],
      karmaTypescriptConfig: {
        tsconfig: './tsconfig.json'
      }
  });
};