module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2023,
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	plugins: ["prettier", "@typescript-eslint"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"prettier/prettier": [
			"warn",
			{
				__comment:
					"for now, this needs to be synchronized manually with settings in .prettierrc, it will be fixed in future",
				endOfLine: "auto",
				singleQuote: false,
				printWidth: 80,
				tabWidth: 4,
				useTabs: true,
			},
		],
	},
	root: true,
};
