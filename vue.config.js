"use strict";
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const { execSync } = require("child_process");

process.env.VUE_APP_GIT_COMMIT = execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_WEB_publicPath,
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: process.env.VUE_APP_TITLE,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});
