import config from 'xi-configs/eslint/node-ts'

export default [
	...config,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
]
