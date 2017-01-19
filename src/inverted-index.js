//require('jasmine/testFiles/empty.json');
//"use strict";
//require('jasmine/books.json');

 class Index {
	constructor(){
		this.path = '';
		this.index = {};
	}

	search(term){

		
		const result = {};
		if (typeof term === typeof []) {
     		 term = term.join();
    	}
    
    	term = term.toLowerCase();
    	term = term.match(/\w+/g);
    	var count = 0;
		for (var key in this.index) {
			if(key === "Terms"){
				var arr = this.index[key];
				for (var i = 0; i < arr.length; i++) {
					if(term === arr[i]){
						result.Terms = term;
					}
				}
			}
			if(key === "Text"){
				var title = this.index[key];
				console.log(title);
				for(var key2 in title){	
					var arr2 = title[key2];
					for(var j = 0; j < arr2.length; j++) {
						if(term === arr2[j]){
							count++;
							result.Text = key2;
						}
					}
				}	
				
			}

		}
		//console.log(result);
	}

	createIndex(filePath){
		var sortObj = require('sort-object');
		var result = [];
		var obj = {};
		var fs = require('fs');
		var data = fs.readFileSync(filePath);
		var Arr = JSON.parse(data);
		var splittedText = [];
		Arr.forEach((document,index)=>{	
		   	splittedText = document.text.toLowerCase().match(/\w+/g);
		   	splittedText = removeDuplicates(splittedText);
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
		   
		   console.log(sortObj(obj));
		   
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
c.createIndex('../jasmine/books.json');
//c.search("alice");
//c.verify('../jasmine/testFiles/wrongFile.txt');
//c.verify('../jasmine/testFiles/invalid.json');
//c.verify('../jasmine/testFiles/empty.json');
//c.verify('../jasmine/books.json');







