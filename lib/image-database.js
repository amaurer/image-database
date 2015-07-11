


/**
var imdb = require("image-database")
var catalog = imdb.read("/test/");
var otherstuff = imdb.read("/stuff/");
*/

module.id = "image-database"

function ImageDatabase(imageRootPath, done){
	var self = this
	this.types = ["jpg","png","gif"]
	this.rootDir = imageRootPath || __dirname
	this.collection = {}

	var dirReader = require(__dirname + "/directory-reader")
	self.collectionBuilder = require(__dirname + "/collection-builder")
	var test = dirReader.get({ rootDir : this.rootDir }, function(files){
		self.collection = self.collectionBuilder.build(files, done)
	})
}

ImageDatabase.prototype.find = function(collectionFilter) {
	return this.collectionBuilder.find(this.collection, collectionFilter)
};





module.exports = ImageDatabase