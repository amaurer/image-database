
/* 

	{
		name : fileMetaDataObject.name,
		title : fileMetaDataObject.title,
		ext : fileMetaDataObject.ext,
		parent : parent,
		path : null,
		mainImage : test_lg.jpg
		md : [test_md.jpg]
		lg : [test_lg.jpg]
		sm : [test_sm.jpg]
	}

*/

function ImageGroup(delimiter){
	this.delimiter = delimiter || "_"
	this.titleCase = require("title-case")
	this.path = require("path")
	return this
}

	
ImageGroup.prototype.assignImageGroup = function(collectionGroup, fileNameAndExt, parent, fullPath){
	var tempMeta = this.getFileMetaData(fileNameAndExt, fullPath)
	// only create a new group if name isn't already found in the group
	if(collectionGroup[tempMeta.name] == null) collectionGroup[tempMeta.name] = this.createImageGroup(tempMeta, parent)
		// Then 
	this.decorateImageGroupByFile(collectionGroup[tempMeta.name], tempMeta, fullPath)
}

		// Find data within the path and assign to properties
		// ex.. Name_Is-a-pretty-cool-picture_lg.jpg
		ImageGroup.prototype.getFileMetaData = function(fileNameAndExt, fullPath) {
			var meta = fileNameAndExt.split(this.delimiter)
			return {
				file : fileNameAndExt,
				fullFilePath : fullPath,
				name : meta[0].toLowerCase(), // Needed to make sure there aren't dups
				title : this.titleCase(meta[0]),
				ext : this.path.extname(fileNameAndExt),
				dessciption : meta[2],
				size : meta[3].split(".")[0],
				pos : (meta[1] === "")? null : meta[1] // null means main image
			}
		}


		// Create a IG if none exists. There may be multiple images assigned to an image group
		// use assignImageGroup for rules applying to a collection
		ImageGroup.prototype.createImageGroup = function(fileMetaDataObject, parent){
			return {
				name : fileMetaDataObject.name,
				title : fileMetaDataObject.title,
				ext : fileMetaDataObject.ext,
				parent : parent,
				path : null,
				mainImage : null
			}
		}


		// Rules applying to file meta and IGs
		// Asign size, and path to group
		ImageGroup.prototype.decorateImageGroupByFile = function(imageGroup, fileMetaDataObject, fullPath){

			// Handle Image Size Group
			var imageSizeString = "noSizeImages", temp
			if(fileMetaDataObject.size != null){
				imageSizeString = fileMetaDataObject.size
			}
			if(imageGroup[imageSizeString] == null) imageGroup[imageSizeString] = []
			if(fileMetaDataObject.pos == null){
				if(fileMetaDataObject.size === "lg") imageGroup.mainImage = fileMetaDataObject.file
				imageGroup[imageSizeString].unshift(fileMetaDataObject.file)
			} else {
				imageGroup[imageSizeString][Number(fileMetaDataObject.pos) - 1] = fileMetaDataObject.file
			}

			// Assign Path
			temp = fullPath.split(this.path.sep)
			temp.splice(temp.length-1, 1)
			imageGroup.path = this.path.sep + temp.join(this.path.sep)

		}



module.exports = ImageGroup