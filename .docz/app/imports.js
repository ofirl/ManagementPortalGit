export const imports = {
  'src/components/AnimatedComponent.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-animated-component" */ 'src/components/AnimatedComponent.mdx'),
  'src/components/Avatar.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-avatar" */ 'src/components/Avatar.mdx'),
  'src/components/Badge.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-badge" */ 'src/components/Badge.mdx'),
  'src/components/Menu.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-menu" */ 'src/components/Menu.mdx'),
}
