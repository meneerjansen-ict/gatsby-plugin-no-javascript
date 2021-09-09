"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPathInclusion(pathname, pluginOptions) {
    if (!pluginOptions.includePaths)
        return false;
    return RegExp(pluginOptions.includePaths).test(pathname);
}
exports.checkPathInclusion = checkPathInclusion;
//# sourceMappingURL=utilities.js.map
