//require('jasmine/testFiles/empty.json');
//"use strict";
//require('jasmine/books.json');

 class Index {

	constructor(){
		this.path = '../jasmine/books.json';
		this.index = {};
	}

	createIndex(filePath){
		filePath = this.path;
		var fs = require('fs');
		fs.readFile(filePath, function (err, data) {
		   if (err) {
		       return console.error(err);
		   }
		   var Arr = JSON.parse(data);
		   var text = "";
		   var title = "";
		  	var splittedText = [];
		  	var splittedTitle = [];
		   var b;
		   for(var i = 0; i < Arr.length; i++){
		   		for(var key in Arr[i]){
		   			if(key === "text"){
		   				text = Arr[i][key] ;
		   			}
		   			if(key === "title"){
		   				title  = Arr[i][key];
		   			}			  				 			
		   		}
		   		splittedText.push(text.toLowerCase().match(/\w+/g));
		   		splittedTitle.push(title);	   		
		   }

		   var obj = {};
		   for(var t = 0; t < splittedTitle.length ; t++){
		   		obj[splittedTitle[t]] = splittedText[t];
		   		//if(this.index.obj[t] !== "undefined")
		   		//this.index[obj[t]] = splittedText[t];
		   	
		   }
		   console.log(obj);
		  var merge = [];
		  	for(var g = 0; g < splittedText.length-1; g++){
		  		 merge = splittedText[g].concat(splittedText[g+1]);
		  }

		
		  console.log(merge);
		  console.log(removeDuplicates(merge));
		 // this.index.Term = removeDuplicates(merge);
		//  console.log(this.index);
		  
		});
		
	}

	verify(filePath){
		filePath = this.path;
		var fs = require('fs');
		fs.readFile(filePath, function (err, data) {
		   if (err) {
		       return console.error(err);
		   }
		   if(JSON.parse(data)  === " "){
		   	return "File empty";
		   }
		   else {
		   	return "File not empty";
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
c.createIndex('jasmine/books.json');
c.verify();
//c.createIndex2('jasmine/books.json');







