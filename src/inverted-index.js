
//require('../jasmine/testFiles/empty.json') ;
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
		//return "File empty";
		var fs = require('browserify-fs');	
		fs.readFile(filePath,'utf8',(err, data) =>  {
					if(err){
						return console.error(err);
					}
					if(JSON.parse(data)  === ""){
						console.log("File empty");
		  				return "File empty";
		  			}
					else console.log(data);
			
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
//module.exports = Index;

//var c = new Index();
//c.verify('../jasmine/testFiles/empty.json');

