
/*
	walks directory, getting file names
	filters proper files (jpg, gif, png)
*/

var path = require("path"),
	util = require("util"),
	walk = require("walk")

var _rootDir = __dirname,
	_options = {},
	_typesArray = [],
	_delimiter = "_"

exports.get = function(options, done){

	_options = options || {}
	_rootDir = _options.rootDir || __dirname
	_typesArray = exports.normalizeFileExtensions(options.types)

	var temp = []

	walker = walk.walk(_rootDir, {followLinks : true})
	walker.on("file", function (root, fileStats, next) {
		if(exports.filterFileExtensions(fileStats.name)){
			temp.push(path.join(root,fileStats.name))
		}
		next();
	});
	walker.on("end", function () {
		done(temp)
	});

}


// returns true/false for filtering the file
exports.filterFileExtensions = function(filename) {
	var temp = filename.split(".")
	if(temp.length === 1) return false
	return (_typesArray.indexOf(temp[temp.length - 1].toLowerCase()) !== -1)
}

// Normalizes types that it is an array
exports.normalizeFileExtensions = function(types) {
	var temp = [];
	if(!types) types = "jpg,png,gif"
	if(typeof types !== "string" && !util.isArray(types)) throw new Error("Types is not a list or an array!")
	if(typeof types === "string") types = types.split(",")
	for (var i = types.length - 1; i >= 0; i--) {
		temp.push(types[i].toLowerCase());
	};
	return types;
}
