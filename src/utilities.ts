import { PluginOptions } from './gatsby-ssr'

export function checkPathInclusion (pathname: string, pluginOptions: PluginOptions): boolean {
  if (!pluginOptions.includePaths) return false

  return RegExp(pluginOptions.includePaths).test(pathname)
}
