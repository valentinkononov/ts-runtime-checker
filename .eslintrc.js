module.exports = {
    env: {
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/no-explicit-any': 0,
        // '@typescript-eslint/no-implicit-any': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
            {
                allowArgumentsExplicitlyTypedAsAny: true,
                allowDirectConstAssertionInArrowFunctions: true,
                allowedNames: [],
                allowHigherOrderFunctions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
        '@typescript-eslint/no-var-requires': 0,
        'react/display-name': 0,
        'prefer-rest-params': 0,
        'prefer-spread': 0,
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                        allowExpressions: true,
                        allowTypedFunctionExpressions: true,
                        allowHigherOrderFunctions: true,
                    },
                ],
            },
        },
    ],
};
