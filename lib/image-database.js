


/**
var imdb = require("image-database")
var catalog = imdb.find("/test/");
var otherstuff = imdb.find("/stuff/");
*/

module.id = "image-database"

function ImageDatabase(imageRootPath, done){
	var self = this
	this.types = ["jpg","png","gif"]
	this.rootDir = imageRootPath || __dirname
	this.collection = {}
	var dirReader = require(__dirname + "/directory-reader")
	self.collectionBuilder = require(__dirname + "/collection-builder")
	dirReader.get({ rootDir : this.rootDir }, function(files){
		self.collection = self.collectionBuilder.build(files, done)
	})
}


// ImageDatabase.prototype.find = function(collectionFilter) {
// 	return this.collectionBuilder.find(this.collection, collectionFilter)
// };

ImageDatabase.prototype.getCollectionFilterGroups = function(collectionFilter){
	if(collectionFilter.substr(0,1) === "/") collectionFilter = collectionFilter.substr(1)
	if(collectionFilter.substr(collectionFilter.length-1,1) === "/") collectionFilter = collectionFilter.substr(0,collectionFilter.length-1)
	return collectionFilter.split("/")
}

ImageDatabase.prototype.find = function(collectionFilter, collection){
	if(collection == null) collection = this.collection
	var filters = this.getCollectionFilterGroups(collectionFilter)
	if(filters.length > 1 && collection[filters[0]] != null){
		return this.find(filters.splice(1).join("/"), collection[filters[0]])
	}
	if(collection[filters[0]] != null) return collection[filters[0]]
	return false;
}





module.exports = ImageDatabase