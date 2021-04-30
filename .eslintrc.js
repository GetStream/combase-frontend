module.exports = {
	parser: "@babel/eslint-parser",
    rules: {
        'callback-return': 0,
        camelcase: 0, // unsuitable, too many stream chat/feeds properties use snake case.
        'eslint-comments/no-unlimited-disable': 0,
        'import/exports-last': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'multiline-comment-style': 0,
        'new-cap': 0,
        'no-warning-comments': 0,
        'node/no-extraneous-import': 0,
        'node/no-extraneous-require': 0,
        'node/no-unpublished-import': 0,
        'object-curly-spacing': 0,
        'react/display-name': 0,
        'react/no-array-index-key': 0, // TEMP
        'react/sort-prop-types': 0, // sort-keys clashes with this if props are capitalized
        'security/detect-unsafe-regex': 0,
        'sort-keys': 0,
        'unicorn/no-abusive-eslint-disable': 0,
    },
};
