
/*


+ plus = ??
- hyphen = Space
_ Underscore = delimeter

name_group-name_product-name_size.extension

*/
var _delimiter = "_"
	_errors = []


exports.build = function(files, done){
	var i, x
	var collection = {}
	for (i = files.length - 1; i >= 0; i--) {
		x = files[i]
		// Verify that it is in the proper format/extension
		if(!exports.filterFileNamingConvention(x)) continue
		if(!exports.hasExtension(x)) continue

		exports.collectionByFolderStructureDecorator(collection, x)

	};
	process.nextTick(function(){
		if(_errors.length){
			done(_errors)
		} else {
			done(null, collection)
		}
		_errors = []
	})
	return collection
}

exports.collectionByFolderStructureDecorator = function(collection, file){
	var fileSplit = file.split("/") // root, section, group, name
	var temp
	// if 2, then assign file path to
	var group = fileSplit[0];
	if(fileSplit.length === 2){
		if(collection[group] == null) collection[group] = []
		if(collection[group].length == null){
			// Throws an error when files exist where tere are folders
			temp = file + " cannot have files where there are folders!!"
			_errors.push(temp)
			console.error(temp)
		} else {
			collection[group].push(fileSplit[1])
		}
	} else if(fileSplit.length > 2){
		if(collection[group] == null) collection[group] = {}
		exports.collectionByFolderStructureDecorator(collection[group], fileSplit.splice(1).join("/"))
	}
}

exports.filterFileNamingConvention = function(file){
	var temp = file.split(_delimiter)
	// check proper amount of groupings
	if(temp.length !== 3 && temp.length !== 2){
		temp = file + " did not have the correct naming pattern"
		_errors.push(temp)
		console.error(temp)
		return false
	}
	return true
}

exports.hasExtension = function(file){
	var temp = file.split(_delimiter)
	// check proper amount of groupings
	if(temp.length < 2){
		temp = file + " did not have an extension"
		_errors.push(temp)
		console.error(temp)
		return false
	}
	return true
}

exports.find = function(collection, collectionFilter){
	if(collectionFilter.substr(0,1) === "/") collectionFilter = collectionFilter.substr(1)
	if(collectionFilter.substr(collectionFilter.length-1,1) === "/") collectionFilter = collectionFilter.substr(0,collectionFilter.length-1)
	var filters = collectionFilter.split("/")
	if(filters.length > 1 && collection[filters[0]] != null){
		return exports.find(collection[filters[0]], filters.splice(1).join(_delimiter))
	}
	if(collection[filters[0]] != null) return collection[filters[0]]
	return false;
}