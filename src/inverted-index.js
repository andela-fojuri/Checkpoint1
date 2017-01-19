//require('jasmine/testFiles/empty.json');
//"use strict";
//require('jasmine/books.json');

 class Index {

	constructor(){
		this.index = {};
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
		//var sortObj = require('sort-object');
		var result = [];
		var obj = {};
		//var fs = require('fs');
		//var data = fs.readFileSync(filePath);
		var Arr = JSON.parse(filePath);
		var splittedText = [];
		var splittedTitle = [];
		var doc = [];
		Arr.forEach((document,index)=>{	
		   	splittedText = document.text.toLowerCase().match(/\w+/g);
		   	splittedText = removeDuplicates(splittedText);
		   	splittedTitle = document.title.toLowerCase().match(/\w+/g);
		   	splittedTitle = removeDuplicates(splittedTitle);
		   	doc = splittedText.concat(splittedTitle);


		   	doc.forEach((word) =>{
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
		   
		this.index = obj;
		return this.index;
		
	}

	verify(filePath){
		var fs = require('fs');
		fs.readFile(filePath, function (err, data) {
			try{	
				//console.log(JSON.parse(data));
				if(JSON.parse(data)  === ""){
					console.log("File empty");
		  			//return "File empty";
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

var c = new Index();
//c.createIndex('../jasmine/books.json');
c.search("alice");
//c.verify('../jasmine/testFiles/wrongFile.txt');
//c.verify('../jasmine/testFiles/invalid.json');
//c.verify('../jasmine/testFiles/empty.json');
//c.verify('../jasmine/books.json');







