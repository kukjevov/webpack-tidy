import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {dirName} from './webpack.commonjs.cjs';

const distPath = 'wwwroot/dist';
const tidyPath = path.join(dirName, "tidy.js");

console.log(tidyPath);

export default [function()
{
    const config =
    {
        entry: 
        {
            app: path.join(dirName, 'index.js')
        },
        output:
        {
            globalObject: 'self',
            path: path.join(dirName, distPath),
            filename: `[name].js`,
            publicPath: 'dist/',
            chunkFilename: `[name].chunk.js`,
            assetModuleFilename: 'assets/[hash][ext][query]'
        },
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        //TODO remove this when https://github.com/webpack/webpack-dev-server/issues/2792 is fixed
        optimization:
        {
            runtimeChunk: 'single',
        },
        resolve:
        {
            symlinks: false,
            extensions: ['.js'],
            alias:
            {
                "tidy": tidyPath
            },
            mainFields: ['esm2020', 'esm2015', 'es2015', 'jsnext:main', 'browser', 'module', 'main'],
            conditionNames: ['esm2020', 'es2015', 'import']
        },
        module:
        {
            rules:
            [
                {
                    test: tidyPath,
                    use:
                    [
                        {
                            loader: "exports-loader",
                            options:
                            {
                                exports: "tidy_html5"
                            }
                        }
                    ]
                },
            ]
        },
        plugins:
        [
            new HtmlWebpackPlugin(
            {
                filename: '../index.html',
                template: path.join(dirName, 'index.html'),
                inject: 'head'
            })
        ]
    };

    return config;
}];