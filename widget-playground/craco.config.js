const path = require('path');

const { getLoader, loaderByName } = require('@craco/craco');

const apollo = path.join(__dirname, '../packages/apollo');
const chat = path.join(__dirname, '../packages/chat');
const styles = path.join(__dirname, '../packages/styles');
const widget = path.join(__dirname, '../packages/widget');

module.exports = {
    webpack: {
        alias: {},
        configure: webpackConfig => {
            const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));

            if (isFound) {
                const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

                match.loader.include = include.concat([apollo, chat, styles, widget]);
            }

            return webpackConfig;
        },
        plugins: [],
    },
};
