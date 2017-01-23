
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
        expect(t.verify(empty)).toEqual("File empty");
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

