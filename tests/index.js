

var IDB = require("../lib/image-database.js")
var idb = new IDB("./", function(e, collection){
	console.log(idb.find("ducks/more"))
})


