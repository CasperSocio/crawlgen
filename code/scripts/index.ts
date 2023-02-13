import addNewLib from './addNewLib'

function main(): void {
	if (process.env.npm_config_add_lib) {
		addNewLib()
	}
}

main()
