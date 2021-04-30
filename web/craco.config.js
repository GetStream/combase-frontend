require('dotenv/config');

let target = 'web';

const path = require('path');

const { getLoader, loaderByName } = require('@craco/craco');

const packages = path.join(__dirname, '../packages');

console.log(`craco.config.js: setting webpack target to: ${target}`);

module.exports = {
    webpack: {
        alias: {},
        configure: webpackConfig => {
            const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));

            if (isFound) {
                const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];
                const exclude = Array.isArray(match.loader.exclude) ? match.loader.exclude : [match.loader.exclude];
				match.loader.include = include.concat([packages]);
				match.loader.exclude = exclude.concat([`${packages}/**/node_modules`]).filter(a => a);
			}
			
			webpackConfig.target = target;

            return webpackConfig;
        },
        plugins: [],
    },
};