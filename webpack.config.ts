import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/server.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "foo.bundle.js",
  },
};

export default config;
