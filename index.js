

var IDB = require("./lib/image-database.js")

var idb = new IDB("./tests", function(e, collection){
	console.log("doner")
	console.log(collection.tests)
})
