const thread = require("child_process");
const path = require("path");
const { isGecko } = require("../utils/node");

const exec = (command) => {
  return new Promise((resolve, reject) => {
    thread.exec(command, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
};

// webpack plugin to copy static files
exports.FilesPlugin = class FilesPlugin {
  apply(compiler) {
    compiler.hooks.make.tap("FilesPlugin", (compilation) => {
      // watch static dir, trigger the done hook, if anything changes
      const resources = path.resolve("public/static");
      !compilation.contextDependencies.has(resources) &&
        compilation.contextDependencies.add(resources);
    });

    // copy static files to build dir when compilation is done
    compiler.hooks.done.tapPromise("FilesPlugin", () => {
      const locales = path.resolve("public/locales/");
      const resources = path.resolve("public/static/");

      const folder = isGecko ? "build-gecko" : "build";
      const localesTarget = path.resolve(`${folder}/_locales/`);
      const resourcesTarget = path.resolve(`${folder}/static/`);

      return Promise.all([
        exec(`cp -r ${locales} ${localesTarget}`),
        exec(`cp -r ${resources} ${resourcesTarget}`),
      ]);
    });
  }
};
