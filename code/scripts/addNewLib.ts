import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

function main(): void {
	const libPath = path.resolve('.', 'lib')
	const newLibName = process.env.npm_config_add_lib
	const newLibPath = path.join(libPath, newLibName)

	if (existsSync(newLibPath)) {
		console.error('Library name is already in use!')
		process.exit(1)
	}

	// Configure package.json from template
	const packageData = JSON.parse(readFileSync(path.resolve('.', 'templates', 'package.json'), 'utf8'))
	packageData.name += newLibName // Adds lib name

	// Generate lib/
	mkdirSync(newLibPath)
	// Generate lib/src/
	mkdirSync(path.join(newLibPath, 'src'))
	// Generate lib/src/index.ts
	writeFileSync(path.join(newLibPath, 'src', 'index.ts'), 'export {}\n', 'utf8')
	// Generate lib/jest.config.ts
	cpSync(path.resolve('.', 'templates', 'jest.config.ts'), path.resolve(newLibPath, 'jest.config.ts'))
	// Generate lib/package.json
	writeFileSync(path.join(newLibPath, 'package.json'), JSON.stringify(packageData, null, 4) + '\n', 'utf8')
}

export default main
