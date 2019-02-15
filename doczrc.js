import { css } from 'docz-plugin-css'

export default {
  // title: 'My Cool Project',
  description: 'This is my awesome documentation',
  plugins: [
    css({
      preprocessor: 'postcss'
    //   cssmodules: true,
    //   loaderOpts: {
    //     /* whatever your preprocessor loader accept */
    //   }
    })
  ],
  themeConfig: {
    mode: 'dark'
    // colors: {
    //   primary: 'tomato',
    // }
  }
}