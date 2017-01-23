(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a the powerful ring."
  }
]

},{}],2:[function(require,module,exports){

const empty = require('../testFiles/empty.json');
var validFile = require("../books.json");
const wrongFile = require("../testFiles/wrongfile.txt");
var t = require("../../src/inverted-index.js");
  t = new Index();
  describe('Inverted index test Suite: ', function () {  
    describe('Read book data', function () {  	
      it('should return "File empty" for upload with no data ', function () {
        expect(t.verify(empty)).toEqual("File empty");
      }); 
      it('should return "Not a JSON file" for upload of a file other than JSON ', function () {
        expect(t.verify(wrongFile)).toEqual("Not a JSON file");
      }); 
      it('should return "Not a JSON file" for upload of a file other than JSON ', function () {
        expect(t.verify(validFile)).toEqual("valid");
      });                                             
    });

    describe('Populate Index', function () {  	
      it('verifies that the index is created once the JSON file has been read ', function () {
        expect(t.createIndex(validFile, "books.json").alice).toBeDefined();
      });                                            

      it('verifies the index maps the string keys to the correct objects in the JSON array ', function () {
        expect(t.createIndex(validFile, "books.json").alice).toEqual([0]);
        expect(t.createIndex(validFile,'books.json').a).toEqual([0, 1]);
      });  

    });

    describe('Search index', function () {  	
      it('t verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query ', function () {
        expect(t.search("books.json", 'and')).toEqual({'and':[0,1]});
      });                                            
    });



    
  });


},{"../../src/inverted-index.js":5,"../books.json":1,"../testFiles/empty.json":3,"../testFiles/wrongfile.txt":4}],3:[function(require,module,exports){
module.exports=[

    
]
},{}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){

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
		// if(filePath.length === 0)
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
			return "File empty";
		}
		if(JSON.stringify(file[0]) === undefined){
			return "Not a JSON file";
		}
		else return "valid";

		


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

// var c = new Index();
// //c.verify("../jasmine/books.json");
// //c.verify('jasmine/testFiles/empty.json');

// var t = require("../jasmine/books.json");
// //console.log(c.createIndex(t,"books.json").alice[0]);
// console.log(c.search("book.json",'alice'));
// //console.log(t);
// //var t = require("../jasmine/testFiles/empty.json");
// //console.log(t[1]);
// //c.verify(t);


},{}]},{},[2])