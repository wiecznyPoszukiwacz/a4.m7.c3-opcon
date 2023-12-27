/* eslint-env node */


module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'plugin:@stylistic/eslint-plugin'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname

	},
	plugins: ['@typescript-eslint', '@stylistic/eslint-plugin'],
	root: true,
	ignorePatterns: [
		'webpack.config.js', 'dist/*.js', 'node_modules'
	],
	env: {
		browser: true
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": ["warn", {
			allowExpressions: true
		}],
		"@typescript-eslint/explicit-member-accessibility": ["warn"],
		"@typescript-eslint/no-unused-vars": "off"
	}

};
