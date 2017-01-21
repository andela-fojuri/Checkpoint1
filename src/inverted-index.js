//require('jasmine/testFiles/empty.json');
// "use strict";
//require('jasmine/books.json');

// function Index() {
// 	console.log("I am inside the Index function");
// }

class Index {

	constructor(){
		this.index = {};
		this.count = [];
		this.allBooks = [];
	}

	getIndex(){
		return this.index;
	}

	search(term){
		term = [];
		for(var key in arguments){
			term.push(arguments[key]);
		}
		
		term = term.toString().toLowerCase().match(/\w+/g);
		console.log(term);
		let result = {};

		term.forEach((word) =>{
			for(var key in this.index){
				if(word === key){
					result[key] = this.index[key]; 
				}
			}
		});
	
		
		console.log(result);
		return result;
	}

	createIndex(filePath){
		var sortObj = require('sort-object');
		var result = [];
		var obj = {};
		//var fs = require('fs');
		//var data = fs.readFileSync(filePath);
		//var Arr = JSON.parse(filePath);
		var splittedText = [];
		var splittedTitle = [];
		var doc = [];
		filePath.forEach((document,index)=>{
			this.count.push(index);
		   	splittedText = document.text.toLowerCase().match(/\w+/g);
		   	splittedText = removeDuplicates(splittedText);
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
		   
		  // console.log(sortObj(obj));
		   
		this.index = sortObj(obj);
		return this.index;
		
	}

	verify(filePath){
		var fs = require('fs');
		//var data = fs.readFileSync(filePath);
		//var Arr = JSON.parse(filePath);
		//var FileReader = require('filereader');
		//var data = fs.readFileSync(filePath);
		
		fs.readFile(filePath, function (err, data) {
			data =JSON.parse(data);
			//if(window.File && window.FileReader && window.FileList) {
			// var r = new FileReader();
			// if(filePath.files){
			// 	r.onload = (e) =>{
            // 	var file = e.target.result
			// 	console.log(e.target.result);
            //   	file = JSON.parse(file);
			// 	console.log(file);

			// 	}
			// 	r.readAsText(file);
			// 	if(file  === ""){
			// 		console.log("File empty");
		  	// 		return "File empty";
		  	// 	}
			// 	  else
			// 	   console.log('hfj');
			// }
			try{	
				//console.log(JSON.parse(data));
				if(data  === ""){
					console.log("File empty");
		  			return "File empty";
		  		}
		  	//	else{
		  			let check = false;
		  			const file = JSON.parse(data);
		  		
		  			file.forEach((element)=> { 
    					if (element.text === "undefined" || element.title === "undefined") {
    						check = true;
    						
    					}
					});

					if(check){
						console.log("Invalid Content");
					}
		  	//	}
				
		   			
			}catch(e){

				return console.error("Invalid JSON file");
			}
		
			

	
		});
	}

}

function removeDuplicates(array){ 
"use strict";	
		for(var i = 0; i < array.length; i++){
			for(var j = i+1; j < array.length; j++){
				if(array[i] === array[j]){
				  array.splice(j, 1);
				}
			}
		}
		return array;
	}

window.Index = Index;
module.exports = Index;

//var c = new Index();
//c.verify('../jasmine/testFiles/empty.json');

