const path = require("path");
const webpack = require("webpack");

module.exports = function transpile({ base, entry }) {
  webpack(
    // webpack configuration
    {
      resolveLoader: {
        // modules here needed but why it still can't resolve @babel/preset-end
        modules: [path.resolve(__dirname, "node_modules")],
        // I read it can be helpful but apparently not:
        // modulesDirectories: [path.resolve(__dirname)],
      },
      target: "node",
      entry: path.resolve(base, entry),
      mode: "development",
      resolve: {
        extensions: [".js"],
        // modules: [
        //   "../transpiler",
        //   "node_modules/transpiler/node_module",
        //   path.resolve(__dirname),
        // ],
      },
      output: {
        path: path.resolve(base, "transpiler-dist"),
        filename: "main.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    },
    (err, stats) => {
      // [Stats Object](#stats-object)

      if (err) {
        console.log(err);
      } else if (stats.hasErrors()) {
        const info = stats.toJson();

        if (stats.hasErrors()) {
          console.log(stats.compilation.errors);
        }

        if (stats.hasWarnings()) {
          console.log(stats.compilation.warnings);
        }
      } else console.log("transpiled successfuly");
    }
  );
};
