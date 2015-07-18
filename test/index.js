
var mainExecPath = "../lib/image-database.js"
var assert = require("assert")

describe("Instantiation", function(){

	var IDB = require(mainExecPath)

	it("Should find three objects", function(done){
		var idb = new IDB("../test/images", function(e, collection){
			console.log(e, collection)
			assert.equal(collection, 2)
			done()
		})
	})

})


