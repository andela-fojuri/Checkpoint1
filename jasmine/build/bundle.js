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
// import Index from '../../src/inverted-index';

const empty = require('../testFiles/empty.json');
const validFile = require('../books.json');
const wrongFile = require('../testFiles/wrongFile.txt');
let index = require('../../src/inverted-index.js');


index = new Index();

describe('Inverted index test Suite: ', () => {
  describe('Read book data', () => {
    it('should return "File empty" for upload with no data ', () => {
      expect(index.verify(empty)).toEqual('File empty');
    });

    it('should return "Not a JSON file" for upload of a file other than JSON ',
    () => {
      expect(index.verify(wrongFile)).toEqual('Not a JSON file');
    });
  });

  describe('Populate Index', () => {
    it('verifies that the index is created once the JSON file has been read ',
     () => {
       expect(index.createIndex('books.json', validFile).alice).toBeDefined();
     });

    it('verifies the index maps the string keys to the correct objectsin the JSON array ', () => {
      expect(index.createIndex('books.json', validFile).alice).toEqual([0]);
      expect(index.createIndex('books.json', validFile).a).toEqual([0, 1]);
    });

    it('Ensure getIndex method takes a string argument that specifies the location of the JSON data. ', () => {
      expect(index.getIndex('books')).toBeDefined();
    });
  });

  describe('Search index', () => {
    it('verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query ', () => {
      expect(index.search('books.json', 'and')).toEqual({ and: [0, 1] });
    });

    it('Ensure searchIndex can handle an array of search terms ', () => {
      expect(index.search('books.json', 'and', ['alice', 'a'])).toEqual({ and: [0, 1], alice: [0], a: [0, 1] });
    });

    it('Search through all files if no name is included ', () => {
      expect(index.search('and', ['alice', 'a'])).toEqual({ and: [0, 1], alice: [0], a: [0, 1] });
    });
  });
});


},{"../../src/inverted-index.js":5,"../books.json":1,"../testFiles/empty.json":3,"../testFiles/wrongFile.txt":4}],3:[function(require,module,exports){
module.exports=[

    
]
},{}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
/**
 * Represents Inverted index instance.
 * @class
 */
class Index {

/**
 * Represents Inverted index attributes.
 * @constructor
 */
  constructor() {
    this.index = {};
    this.allBooks = [];
    this.all = [];
    this.docNum = {};
  }

/**
 * A method that retuns a created index
 * @param {string} filename is the name of the file to me indexed
 * @return {Object} Returns an Object containing the created Index.
 */
  getIndex(filename) {
    return this.index[filename];
  }

/**
 * Search
 *
 * A method that searches for words in an index
 *
 * @param {string} filename is the name of the file to be searched
 * @param {string} term is what to search for
 * @return {Object} Returns an Object of the search result.
 */
  search(filename, ...terms) {
    let result = {};
    if (!filename.includes('json')) {
      terms.push(filename);
      result = this.searchAll(terms);
    } else {
      filename = filename.replace(/\.json|\.|\s/g, '');
      terms = terms.toString().toLowerCase().match(/\w+/g);

      terms.forEach((word) => {
        Object.keys(this.index[filename]).forEach((key) => {
          if (word === key) {
            result[key] = this.index[filename][key];
          }
        });
      });
    }
    return result;
  }

/**
 *
 * searchAll
 *
 * A method that searches for terms in all indexed files
 * @param {Array} terms is the array of terms to search for
 * @return {Object} Returns an Object of the search result.
 */
  searchAll(terms) {
    const result = {};
    terms = terms.toString().toLowerCase().match(/\w+/g);
    Object.keys(this.index).forEach((filename) => {
      terms.forEach((term) => {
        Object.keys(this.index[filename]).forEach((key) => {
          if (term === key) {
            result[key] = this.index[filename][key];
          }
        });
      });
    });
    return result;
  }

/**
 *
 * createIndex
 *
 * A method to retun a created index
 * @param {string} filename is the name of the file to me indexed
 * @param {string} fileContent is the content of the file to be indexed
 * @return {Object} Returns an Object containing the created Index.
 */
  createIndex(filename, fileContent) {
    const createdObj = {};
    filename = filename || 'allBooks';
    const count = [];
    fileContent.forEach((book, index) => {
      let splittedWord = [];
      count.push(index + 1);
      Object.keys(book).forEach((key) => {
        splittedWord = splittedWord.concat(book[key]
        .toLowerCase().match(/\w+/g));
      });
      splittedWord = this.removeDuplicates(splittedWord);
      splittedWord.forEach((word) => {
        if (createdObj[word] === undefined) {
          createdObj[word] = Array.from(new Array([]), () => index);
        } else {
          createdObj[word].push(index);
        }
      });
    });
    filename = filename.replace(/\.json|\.|\s/g, '');
    this.docNum[filename] = count;
    this.index[filename] = this.sortObj(createdObj);
    return this.index[filename];
  }

/**
 *
 * sortObj
 *
 * A method to sort an Object by Key
 * @param {Object} obj  isthe Object to Sorted
 * @return {Object} Returns the Sorted Object.
 */
  sortObj(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObject = {};
    sortedKeys.forEach((key) => {
      sortedObject[key] = obj[key];
    });
    return sortedObject;
  }

/**
 * removeDuplicates
 *
 * A method to remove duplicate words in an array
 * @param {array} arr the array to remove duplicate words from
 * @return {array} Returns an array with no duplicate words.
 */
  removeDuplicates(arr) {
    return arr.filter((word, index) => arr.indexOf(word) === index);
  }

/**
 * verify
 *
 * A method to verify  a valid file
 * @param {array} fileContent the array to remove duplicate words from
 * @return {String} Returns the status of the file.
 */
  verify(fileContent) {
    if (fileContent.length === 0) {
      return 'File empty';
    }
    if (JSON.stringify(fileContent[0]) === undefined) {
      return 'Not a JSON file';
    }
    fileContent.forEach((book) => {
      if (!book.title || !book.text) {
        return 'Your books must be an object of title and text';
      }
    });
  }

}

},{}]},{},[2])