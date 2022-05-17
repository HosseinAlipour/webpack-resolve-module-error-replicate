const path = require("path");
const webpack = require("webpack");
module.exports = function transpile({ base, entry }) {
  webpack(
    {
      entry: path.resolve(base, entry),
      mode: "development",
      resolve: {
        extensions: [".js"],
      },
      output: {
        path: path.resolve(base, "master-dist"),
        filename: "main.js",
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
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
          console.error(info.errors);
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }
      } else console.log("good");
    }
  );
};
