
class Index {
	constructor(){
		this.index = {};	
		this.allBooks = [];
		this.docNum = {};
	}

	getIndex(filename){
		return this.index[filename];
	}

	search(filename,term){
		term = [];
		for(var key in arguments){
			term.push(arguments[key]);		
		}
		//console.log(term);
		
		term = term.toString().toLowerCase().match(/\w+/g);

		var result = {};
		
		term.forEach((word) =>{
			for(var key in this.index[filename]){
					if(word === key){
					result[key] = this.index[filename][key]; 			
			}
				
			}
		});

		

		return result;
	}

	createIndex(file, filename){
		// if(filePath.length === 0){
		// 	this.
		// }
		var result = [];
		var obj = {};
		filename = filename ? filename : "allBooks";
		//var fs = require('fs');
		//var data = fs.readFileSync(filePath);
		//var Arr = JSON.parse(filePath);

		var splittedText = [];
		var splittedTitle = [];
		var doc = [];
		var count = [];
		file.forEach((document,index)=>{
			count.push(index);
				
		   	splittedText = document.text.toLowerCase().match(/\w+/g);
		   	splittedText = this.removeDuplicates(splittedText);
		   	//splittedTitle = document.title.toLowerCase().match(/\w+/g);
		   	//splittedTitle = removeDuplicates(splittedTitle);
		   //	doc = splittedText.concat(splittedTitle);


		   	splittedText.forEach((word) =>{
		   		if(obj[word] === undefined){
		   			var indices = [];
		   			indices.push(index);
		   			obj[word] = indices;
		   		}
		   			else{
		   				obj[word].push(index);

		   			}
		   			
		   		});
		   });
		
		this.docNum[filename.replace(/\.json|\.|\s/g, '')] = count; 
		this.index[filename.replace(/\.json|\.|\s/g, '')] = this.sortObj(obj);
		return this.sortObj(obj);
	}

	verify(file){
		if (file.length === 0) {
			console.log("File empty");
			return "File empty";
		}

		if(JSON.parse(file)){
			return "Kindly"
		}

		


	 }



	 sortObj(index){
        let sortedKeys = Object.keys(index).sort();
        let sortedObject = {}; //Object that will contain the sorted object
        sortedKeys.forEach((key)=>{
            sortedObject[key] = index[key];
        });
        return(sortedObject);
    }

	removeDuplicates(array){ 
		for(var i = 0; i < array.length; i++){
			for(var j = i+1; j < array.length; j++){
				if(array[i] === array[j]){
				  array.splice(j, 1);
				}
			}
		}
		return array;
	}

}



	

window.Index = Index;
//module.exports = Index;

var c = new Index();
//c.verify("../jasmine/books.json");
//c.verify('jasmine/testFiles/empty.json');

var t = require("../jasmine/books.json");
//console.log(c.createIndex(t,"books.json").alice[0]);
console.log(c.search("book.json",'alice'));
//console.log(t);
//var t = require("../jasmine/testFiles/empty.json");
//console.log(t[1]);
//c.verify(t);

