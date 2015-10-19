var path = require('path'),
    fs   = require('fs-extra')


module.exports = {
	matchOnFileRelativePath: [
		'src',
		'src/**/*'
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
		isEnabled              : true,
		description            : 'compile ECMAScript 6',
		matchOnFileRelativePath: /\.es6\.js$/,
		program                : 'babel',
		arguments              : [
			'$filePath'
		],
		createOutputFromStdout : true,
		outputPath             : function (info) {
			return path.join(info.projectPath, 'dest', info.dirRelativePath.substr(4), info.fileNameWithoutAllExtensions + '.js')
		}
	}, {
		isEnabled              : true,
		description            : 'copy ECMAScript 5',
		matchOnFileRelativePath: /[^6]\.js$/,
		program                : function (info) {
			var sourceFile = info.filePath
			var destFile = path.join(info.projectPath, 'dest', info.dirRelativePath.substr(4), info.fileNameWithoutAllExtensions + '.js')
			fs.copySync(sourceFile, destFile)
		}

	}]
}