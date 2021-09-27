"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPathExclusion(pathname, pluginOptions) {
    if (!pluginOptions.excludePaths)
        return false;
    return RegExp(pluginOptions.excludePaths).test(pathname);
}
function checkPathInclusion(pathname, pluginOptions) {
    if (!pluginOptions.includePaths)
        return false;
    return RegExp(pluginOptions.includePaths).test(pathname);
}
exports.checkPathExclusion = checkPathExclusion;
exports.checkPathInclusion = checkPathInclusion;
//# sourceMappingURL=utilities.js.map
