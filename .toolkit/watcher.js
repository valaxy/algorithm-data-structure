module.exports = {
	ignoreOnFileRelativePath: [
		/^backup/,
		/^bower_components/,
		/^doc/,
		/^test/,
		/^lib/
	],

	tasks: [{
		description            : 'compile TypeScript',
		isEnabled              : false,
		matchOnFileRelativePath: /\.ts$/,
		program                : 'tsc',
		arguments              : function (info) {
			var arg1 = '--out '
				+ info.projectPath
				+ '/dest/'
				+ info.dirRelativePath.substr(4) // remove head `src/`
				+ '/'
				+ info.fileNameWithoutExtension
				+ '.js'
			var arg2 = info.filePath
			return [arg1, arg2].join(' ')
		}
	}, {
		description            : 'compile ECMAScript 6',
		isEnabled              : true,
		matchOnFileRelativePath: /\.es6\.js$/,
		program                : 'babel',
		arguments              : function (info) {
			var arg1 = '--out-file '
				+ info.projectPath
				+ '/dest/'
				+ info.dirRelativePath.substr(4) // remove head `src/`
				+ '/'
				+ info.fileNameWithoutAllExtensions
				+ '.js'
			var arg2 = info.filePath
			return [arg1, arg2].join(' ')
		}
	}]
}