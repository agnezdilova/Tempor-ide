/**
 * Don't touch this file. It will be renerated by theia build.
 * To customize webpack configuration change /home/bearhug15/tempor-ide/browser-app/webpack.config.js
 */
// @ts-check
const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CompressionPlugin = require('@theia/compression-webpack-plugin')

const outputPath = path.resolve(__dirname, 'lib');
const { mode, staticCompression }  = yargs.option('mode', {
    description: "Mode to use",
    choices: ["development", "production"],
    default: "production"
}).option('static-compression', {
    description: 'Controls whether to enable compression of static artifacts.',
    type: 'boolean',
    default: true
}).argv;
const development = mode === 'development';

const monacoEditorCorePath = development ? '/home/bearhug15/tempor-ide/node_modules/@typefox/monaco-editor-core/dev/vs' : '/home/bearhug15/tempor-ide/node_modules/@typefox/monaco-editor-core/min/vs';
const monacoCssLanguagePath = '/home/bearhug15/tempor-ide/node_modules/monaco-css/release/min';
const monacoHtmlLanguagePath = '/home/bearhug15/tempor-ide/node_modules/monaco-html/release/min';

const plugins = [new CopyWebpackPlugin([
    {
        from: monacoEditorCorePath,
        to: 'vs'
    },
    {
        from: monacoCssLanguagePath,
        to: 'vs/language/css'
    },
    {
        from: monacoHtmlLanguagePath,
        to: 'vs/language/html'
    }
])];
// it should go after copy-plugin in order to compress monaco as well
if (staticCompression) {
    plugins.push(new CompressionPlugin({
        // enable reuse of compressed artifacts for incremental development
        cache: development
    }));
}
plugins.push(new CircularDependencyPlugin({
    exclude: /(node_modules|examples)[\\|/]./,
    failOnError: false // https://github.com/nodejs/readable-stream/issues/280#issuecomment-297076462
}));

module.exports = {
    entry: path.resolve(__dirname, 'src-gen/frontend/index.js'),
    output: {
        filename: 'bundle.js',
        path: outputPath
    },
    target: 'web',
    mode,
    node: {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        crypto: 'empty'
    },
    module: {
        rules: [
            {
                test: /worker-main\.js$/,
                loader: 'worker-loader',
                options: {
                    name: 'worker-ext.[hash].js'
                }
            },
            {
                test: /\.css$/,
                exclude: /materialcolors\.css$|\.useable\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /materialcolors\.css$|\.useable\.css$/,
                use: [
                  {
                    loader: 'style-loader/useable',
                    options: {
                      singleton: true,
                      attrs: { id: 'theia-theme' },
                    }
                  },
                  'css-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                }
            },
            {
                // see https://github.com/eclipse-theia/theia/issues/556
                test: /source-map-support/,
                loader: 'ignore-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                exclude: /jsonc-parser|fast-plist|onigasm|(monaco-editor.*)/
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /node_modules[\\|/](vscode-languageserver-types|vscode-uri|jsonc-parser)/,
                use: { loader: 'umd-compat-loader' }
            },
            {
                test: /\.wasm$/,
                loader: "file-loader",
                type: "javascript/auto",
            },
            {
                test: /\.plist$/,
                loader: "file-loader",
            },
            {
                test: /\.js$/,
                // include only es6 dependencies to transpile them to es5 classes
                include: /monaco-languageclient|vscode-ws-jsonrpc|vscode-jsonrpc|vscode-languageserver-protocol|vscode-languageserver-types|vscode-languageclient/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            // reuse runtime babel lib instead of generating it in each js file
                            '@babel/plugin-transform-runtime',
                            // ensure that classes are transpiled
                            '@babel/plugin-transform-classes'
                        ],
                        // see https://github.com/babel/babel/issues/8900#issuecomment-431240426
                        sourceType: 'unambiguous',
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'vs': path.resolve(outputPath, monacoEditorCorePath),
            'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
        }
    },
    devtool: 'source-map',
    plugins,
    stats: {
        warnings: true
    }
};