module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint" // For TypeScript
			],
			"overrides": [ // Use `overrides` for checking TS & JS files by ESLint
			{
				"files": ['*.ts', '*.tsx'],
				"extends": [
					"plugin:@typescript-eslint/recommended",
					"plugin:@typescript-eslint/recommended-requiring-type-checking",
				],
				"parserOptions": {
					"tsconfigRootDir": __dirname,
					"project": ['./tsconfig.json'],
				},
			},
		],
		"ignorePatterns": ['.eslintrc.js'],
		"rules": {
			"quotes": ["error", "single"],  // Use single quotes.
			"semi": ["error", "always"],  // Always use seli colons.
			"no-tabs": "off",
			"indent": ["error", "tab"],  // Indent set as tab.
			"no-console": "error",  // Avoid using methods of the console (console.log) in the code.
			"no-var": "error",
		}
	}
