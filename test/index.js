
var assert = require("assert")

describe("Instantiation", function(){

	var IDB = require("../lib/image-database.js")

	it("should not have empty object", function(done){
		var idb = new IDB("./test", null, function(e, collection){
			if(e) console.error(e)
			console.log("Collection Output")
			if(collection.test != undefined && collection.test.images != undefined){
				console.log(collection.test.images)
			} else {
				console.log(collection)
			}
			assert.equal(e, null, "Should not be any errors")
			assert.notEqual(collection, {}, "Should not be an empty object")
			done()
		})
	})

})


// Hugo-Queen_67Wx88.5Lx80.5H|Cal King 78Wx92Lx80.5H|Eastern King 82Wx88.5Lx80.5H