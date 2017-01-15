(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){


 

//var t = new Index();ß
//require('/../src/inverted-index.js')
(function() {	
  describe('Inverted index test Suite: ', function () {
  	require('../../src/inverted-index.js');
  	require('../testFiles/empty.json');
  	var t = new Index();

    describe('Read book data', function () {

      it('should return "Empty File" for upload with no data ', function () {
        expect(verify()).to.Equal("File empty");
      });

    });


  });

})();
},{"../../src/inverted-index.js":4,"../testFiles/empty.json":3}],3:[function(require,module,exports){
module.exports=[]
},{}],4:[function(require,module,exports){
//require('jasmine/testFiles/empty.json');
//require('jasmine/books.json');
class Index {

	constructor(){
		this.path = 'jasmine/books.json';
	}

	createIndex(filePath){
		filePath = this.path;
		var fs = require('fs');
		fs.readFile(filePath, function (err, data) {
		   if (err) {
		       return console.error(err);
		   }
		   var Arr = JSON.parse(data);
		   var bookObject = {};
		   var sentence = "";
		  	var splittedArr = [];
		  	var splitted;
		   var b;
		   for(var i = 0; i < Arr.length; i++){
		   		for(var key in Arr[i]){
		   				var heading = key +i;
		   				sentence = heading + " " +Arr[i][key]; 
		   				splitted = sentence.split(/[\s,]+/);
		   				splittedArr.push(splitted);
		   				console.log(splitted);	  				
		   		}	

		   }
		   

		});
		
	}

	getIndex(){

	}

	searchIndex(terms){

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

//var c = new Index();
//c.createIndex();
//c.verify();








},{"fs":1}]},{},[2]);
