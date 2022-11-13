module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Doilify'
    },
    demo: {
      entry: 'src/demo.js',
      title: 'Demo'
    },
    svg: {
      entry: 'src/svg.js',
      title: 'SVG'
    }
  },
  pwa: {
    name: 'Doilify',
    themeColor: 'DarkGoldenRod',
    msTileColor: 'DarkGoldenRod',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'DarkGoldenRod',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    // workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/sw.js',
      // ...other Workbox options...
    },
    manifestOptions: {
      name: 'Doilify',
      short_name: 'Doilify',
      description: 'An app to help you design your crochet doilies!',
      // icons: [
      //   {"src":"./img/icons/myicon.png","sizes":"512x512","type":"image/png"}
      // ],
      background_color: 'DarkGoldenRod'
    }
  }
}
