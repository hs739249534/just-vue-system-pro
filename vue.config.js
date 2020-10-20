// server url
// const target = "http://10.19.92.213:12323";
const target = "http://10.19.92.206:1212";
// const target = "http://localhost:1212";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  indexPath: "ggfw-dashboard.html",
  assetsDir: "static-ggfw-dashboard",
  outputDir: `dist-ggfw-dashboard-${require("./package").version}`,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 7009,
    proxy: {
      "/sys": {
        target
      },
      "/": {
        target
      }
    }
  }
};
