

var IDB = require("./lib/image-database.js")

var idb = new IDB("./test", "_", function(e, collection){
	if(e) console.error(e)
	console.log(collection.test.images.more.hugo)
})
