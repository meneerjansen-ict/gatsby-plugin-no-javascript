import { PluginOptions } from './gatsby-ssr'

export function checkPathInclusion (pathname: string, pluginOptions: PluginOptions): boolean {
  console.log("test")
  if (!pluginOptions.includePaths) return false
  console.log(pluginOptions.includePaths)
  console.log(pathname)
  console.log(RegExp(pluginOptions.includePaths).test(pathname))
  console.log(RegExp(pluginOptions.includePaths))
  return RegExp(pluginOptions.includePaths).test(pathname)
}
