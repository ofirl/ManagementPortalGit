export const imports = {
  'src/components/AnimatedComponent.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-animated-component" */ 'src/components/AnimatedComponent.mdx'),
  'src/components/Avatar.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-avatar" */ 'src/components/Avatar.mdx'),
  'src/components/Icon.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-icon" */ 'src/components/Icon.mdx'),
  'src/components/Menu.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-menu" */ 'src/components/Menu.mdx'),
  'src/components/PageHeader.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-page-header" */ 'src/components/PageHeader.mdx'),
}
