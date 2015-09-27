
/*

+ plus = ??
- hyphen = Space
_ Underscore = delimeter

name_group-name_product-name_size.extension

*/

var _delimiter = "_",
	_errors = [],
	path = require("path"),
	ImageGroup = require("./image-group"),
	ig = new ImageGroup(_delimiter)



exports.build = function(files, delimiter, done){
	if(delimiter != null) _delimiter = ig.delimiter = delimiter
	if(done == null) done = function(){}
	var i, x
	var collection = {}
	for (i = files.length - 1; i >= 0; i--) {
		x = files[i]
		// Verify that it is in the proper format/extension
		if(!exports.filterFileNamingConvention(x)) continue
		// collection decorator
		exports.collectionByFolderStructureDecorator(collection, x)
	};
	// keeps things asyncronous
	process.nextTick(function(){
		if(_errors.length){
			done(_errors)
		} else {
			done(null, collection)
		}
		_errors = []
	})
	// returns for assignment 
	return collection
}

		//Validates it had the correct pattern
		exports.filterFileNamingConvention = function(file){
			var temp = file.split(_delimiter)
			// check proper amount of groupings
			// pos 1 Name
			// pos 2 Description
			// pos 3 Size
			if(temp.length !== 4){
				temp = file + " did not have the correct naming pattern <name_pos_description_size.<jpg|png|gif>"
				_errors.push(temp)
				return false
			}
			return true
		}

		// Takes the files array and groups them with meta data then joins like named files
		exports.collectionByFolderStructureDecorator = function(collection, file, fullPath){
			var temp
			// Assigns full path on first call because it's the same
			if(fullPath == null) fullPath = file
			// breaks-up folder structure
			var fileSplit = file.split(path.sep) // root, section, group, name
			var group = fileSplit[0];
			// If 2, then we've reached the file, shred for data
			if(fileSplit.length === 2){
				if(collection[group] == null) collection[group] = {}
				ig.assignImageGroup(collection[group], fileSplit[1], fileSplit[0], fullPath)

			// If more than 2 depth, then call recursively for path digging - /path/to/file.jpg
			} else if(fileSplit.length > 2){
				if(collection[group] == null) collection[group] = {}
				exports.collectionByFolderStructureDecorator(collection[group], fileSplit.splice(1).join(path.sep), fullPath)
			}
		}



exports.find = function(collection, collectionFilter){
	collectionFilter = exports.removeTrailingSlash(collectionFilter)
	var filters = collectionFilter.split(path.sep)
	if(filters.length > 2 && collection[filters[0]] != null){
		return exports.find(collection[filters[0]], filters.splice(1).join(_delimiter))
	}
	if(collection[filters[0]] != null) return collection[filters[0]]
	return false;
}

		exports.removeTrailingSlash = function(collectionFilter){
			if(collectionFilter.substr(0,1) === path.sep) collectionFilter = collectionFilter.substr(1)
			if(collectionFilter.substr(collectionFilter.length-1,1) === path.sep) collectionFilter = collectionFilter.substr(0,collectionFilter.length-1)
			return collectionFilter
		}

