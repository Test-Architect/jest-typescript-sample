module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'prettier'
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@', './src']
				],
				extensions: ['.ts', '.js', '.json']
			}
		}
	},
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': 'error'
	},
};  