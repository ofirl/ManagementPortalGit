export const imports = {
  'src/components/AnimatedComponent.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-animated-component" */ 'src/components/AnimatedComponent.mdx'),
  'src/components/Menu.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-menu" */ 'src/components/Menu.mdx'),
}
