// server url
const target = "http://10.19.92.213:12323";

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
      }
    }
  }
};
