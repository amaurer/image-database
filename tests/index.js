

exports.getFileNamePosSize = function(fileName){
	return fileName.split(_delimiter)
}

exports.extractFileMetaData = function(fileNameAndExt){
	var meta = exports.getFileNamePosSize(fileNameAndExt)
	var hasPosition = (meta.length === 3)
	return {
		file : file,
		name : meta[0],
		ext : path.extname(fileNameAndExt),
		pos : (hasPosition)? meta[1] : null,
		size : (hasPosition)? meta[2] : meta[1]
	}
}

var IDB = require("../lib/image-database.js")
var idb = new IDB("./", function(e, collection){
	console.log(idb.find("ducks/more/baby-duck"))
})


