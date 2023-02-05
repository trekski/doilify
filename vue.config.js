module.exports = {
  pages: {
    index: {
      entry: "src/pages/app.js",
      title: "Doilify",
    },
    demo: {
      entry: "src/pages/demo.js",
      title: "Demo",
    },
    svg: {
      entry: "src/pages/svg.js",
      title: "SVG",
    },
    gui_tests: {
      entry: "src/pages/gui_tests.js",
      title: "GUI",
    },
  },
  pwa: {
    name: "Doilify",
    themeColor: "DarkGoldenRod",
    msTileColor: "DarkGoldenRod",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "DarkGoldenRod",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    // workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/sw.js',
      // ...other Workbox options...
    },
    manifestOptions: {
      name: "Doilify",
      short_name: "Doilify",
      description: "An app to help you design your crochet doilies!",
      // icons: [
      //   {"src":"./img/icons/myicon.png","sizes":"512x512","type":"image/png"}
      // ],
      background_color: "DarkGoldenRod",
    },
  },
};
