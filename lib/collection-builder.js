c

exports.build = function(files){
	var i, ii, fileSplit
	var collection = {}
	for (i = files.length - 1; i >= 0; i--) {
		fileSplit = files[i].split("/") // root, group, section, name, alter

		// skip if directory structure missing group
		if(fileSplit.length < 3){

		}
		if(collection[fileSplit[0]] == null) collection[n] = {}




	};

}

exports.find = function(collection, searchString){
	
}