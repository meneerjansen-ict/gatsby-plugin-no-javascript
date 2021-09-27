"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./utilities");
var pageScripts;
/*
 * The "scripts" variable is not documented by Gatsby, https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody, and that is probably for a good
 * reason. The variable contains the scripts the Gatsby internals, https://github.com/gatsbyjs/gatsby/blob/d9cf5a21403c474846ebdf7a0508902b9b8a2ea9/packages/gatsby/cache-dir/static-entry.js#L270-L283,
 * puts into the head and post body. We will be relying on this undocumented variable until it does not work anymore as the alternative is
 * to read the webpack.stats.json file and parse it ourselves.
 */
function onRenderBody(_a) {
    var scripts = _a.scripts;
    if (process.env.NODE_ENV !== 'production') { // During a gatsby development build (gatsby develop) we do nothing.
        return;
    }
    // TODO maybe we should not even wait and see if Gatsby removes this internal "script" variable and code around the issue if the variable is not there.
    if (!scripts) {
        throw new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.');
    }
    pageScripts = scripts;
}
exports.onRenderBody = onRenderBody;
// Here we rely on the fact that onPreRenderHTML is called after onRenderBody so we have access to the scripts Gatsby inserted into the HTML.
function onPreRenderHTML(_a, pluginOptions) {
    var getHeadComponents = _a.getHeadComponents, pathname = _a.pathname, replaceHeadComponents = _a.replaceHeadComponents, getPostBodyComponents = _a.getPostBodyComponents, replacePostBodyComponents = _a.replacePostBodyComponents;
    if (process.env.NODE_ENV !== 'production') { // During a gatsby development build (gatsby develop) we do nothing.
        return;
    }

    if (utilities_1.checkPathInclusion(pathname, pluginOptions)) {
        replaceHeadComponents(getHeadComponentsNoJS(getHeadComponents(), pluginOptions));
        replacePostBodyComponents(getPostBodyComponentsNoJS(getPostBodyComponents(), pluginOptions));
    }
}
exports.onPreRenderHTML = onPreRenderHTML;
function getHeadComponentsNoJS(headComponents, pluginOptions) {
    return headComponents.filter(function (headComponent) {
        // Not a react component and therefore not a <script>.
        if (!isReactElement(headComponent)) {
            return true;
        }
        if (pluginOptions.excludeFiles && headComponent.props.href && RegExp(pluginOptions.excludeFiles).test(headComponent.props.href)) {
            return true;
        }
        // Gatsby puts JSON files in the head that should also be removed if javascript is removed, all these Gatsby files are in the
        // "/static" or /page-data directories.
        if (headComponent.props.href && (headComponent.props.href.startsWith('/static/') || headComponent.props.href.startsWith('/page-data/'))) {
            return false;
        }
        return pageScripts.find(function (script) {
            return headComponent.props.as === 'script' &&
                "/" + script.name === headComponent.props.href &&
                script.rel === headComponent.props.rel;
        }) === undefined;
    });
}
function getPostBodyComponentsNoJS(postBodyComponents, pluginOptions) {
    return postBodyComponents.filter(function (postBodyComponent) {
        // Not a react component and therefore not a <script>.
        if (!isReactElement(postBodyComponent)) {
            return true;
        }
        if (pluginOptions.excludeFiles && postBodyComponent.props.src && RegExp(pluginOptions.excludeFiles).test(postBodyComponent.props.src)) {
            return true;
        }
        // These are special Gatsby files we are calling out specifically.
        if (postBodyComponent.props.id && (postBodyComponent.props.id === 'gatsby-script-loader' || postBodyComponent.props.id === 'gatsby-chunk-mapping')) {
            return false;
        }
        return pageScripts.find(function (script) { return postBodyComponent.type === 'script' && "/" + script.name === postBodyComponent.props.src; }) === undefined;
    });
}
function isReactElement(reactNode) {
    return reactNode.props !== undefined;
}
//# sourceMappingURL=gatsby-ssr.js.map
