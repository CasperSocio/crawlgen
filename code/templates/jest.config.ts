import { Config } from 'jest'
import path from 'path'
import baseConfig from '../../jest.config'

const config: Config = {
	...baseConfig,
	displayName: __dirname.split(path.sep).slice(-2).join(path.posix.sep),
}

export default config
