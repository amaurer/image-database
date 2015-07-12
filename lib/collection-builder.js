
/*


+ plus = ??
- hyphen = Space
_ Underscore = delimeter

name_group-name_product-name_size.extension

*/
var _delimiter = "_",
	_errors = [],
	path = require("path"),
	titleCase = require("title-case")


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

exports.decorateImageGroup = function(fileMetaData, imageGroup){
	var imageSizeString = "noSizeImages"
	if(fileMetaData.size != null){
		imageSizeString = fileMetaData.size
	}
	if(imageGroup[imageSizeString] == null) imageGroup[imageSizeString] = []
	if(fileMetaData.pos == null){
		if(fileMetaData.size == null){
			imageGroup.mainImage = fileMetaData.file
		}
		imageGroup[imageSizeString].unshift(fileMetaData.file)
	} else {
		imageGroup[imageSizeString][Number(fileMetaData.pos)] = fileMetaData.file
	}
}

exports.createImageGroup = function(fileMetaData){
	return {
		name : fileMetaData.name,
		title : fileMetaData.title,
		ext : fileMetaData.ext,
		mainImage : null
	}
}

exports.getFileNamePosSize = function(fileName){
	return fileName.split(_delimiter)
}

exports.extractFileMetaData = function(fileNameAndExt){
	var meta = exports.getFileNamePosSize(fileNameAndExt)
	var hasPosition = (meta.length === 3)
	return {
		file : fileNameAndExt,
		name : meta[0],
		title : titleCase(meta[0]),
		ext : path.extname(fileNameAndExt),
		pos : (hasPosition)? meta[1] : null,
		size : (hasPosition)? meta[2].split(".")[0] : meta[1].split(".")[0]
	}
}

exports.collectionByFolderStructureDecorator = function(collection, file){
	var fileSplit = file.split("/") // root, section, group, name
	var temp
	// if 2, then assign file path to
	var group = fileSplit[0];
	if(fileSplit.length === 2){
		if(collection[group] == null) collection[group] = {}
		/*
		if(collection[group].length == null){
			// Throws an error when files exist where tere are folders
			temp = file + " cannot have files where there are folders!!"
			_errors.push(temp)
			console.error(temp)
		} else {

			/* 
				- get name only and assign to object to it
				- 
				{
					fileName
					name
					ext
					size
					pos
					group
				}
			*/
			temp = exports.extractFileMetaData(fileSplit[1])
			if(collection[group][temp.name] == null) collection[group][temp.name] = exports.createImageGroup(temp)
			exports.decorateImageGroup(temp, collection[group][temp.name])
		//}
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

exports.removeTrailingSlash = function(collectionFilter){
	if(collectionFilter.substr(0,1) === "/") collectionFilter = collectionFilter.substr(1)
	if(collectionFilter.substr(collectionFilter.length-1,1) === "/") collectionFilter = collectionFilter.substr(0,collectionFilter.length-1)
	return collectionFilter
}
exports.find = function(collection, collectionFilter){
	collectionFilter = exports.removeTrailingSlash(collectionFilter)
	var filters = collectionFilter.split("/")
	if(filters.length > 2 && collection[filters[0]] != null){
		return exports.find(collection[filters[0]], filters.splice(1).join(_delimiter))
	}
	if(collection[filters[0]] != null) return collection[filters[0]]
	return false;
}