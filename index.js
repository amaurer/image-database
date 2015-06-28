


/**
var imdb = require("image-database")
var catalog = imdb.read("/test/");
var otherstuff = imdb.read("/stuff/");
*/

module.id = "image-database"

function ImageDatabase(imageRootPath, done){
	this.types = ["jpg","png","gif"]
	this.rootDir = imageRootPath || __dirname
	this.collection = {}

	var dirReader = require("lib/directory-reader")
	var collectionBuilder = require("lib/collection-builder")

	var test = dirReader.get({ rootDir : this.rootDir }, function(files){
		collection = collectionBuilder.build(files, done)
	})
}

ImageDatabase.prototype.findCollection = function(collectionFilter) {
	collectionFilter = "/group/section/name"
	return collectionBuilder.find(collectionFilter)
};





module.exports = ImageDatabase