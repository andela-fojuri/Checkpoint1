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
const validFile = require('../books.json');
const wrongFile = require('../testFiles/wrongFile.txt');
let t = require('../../src/inverted-index.js');

t = new Index();
describe('Inverted index test Suite: ', () => {
  describe('Read book data', () => {
    it('should return "File empty" for upload with no data ', () => {
      expect(t.verify(empty)).toEqual('File empty');
    });
    it('should return "Not a JSON file" for upload of a file other than JSON ',
    () => {
      expect(t.verify(wrongFile)).toEqual('Not a JSON file');
    });
    it('should return "Not a JSON file" for upload of a file other than JSON ',
     () => {
       expect(t.verify(validFile)).toEqual('valid');
     });
  });
  describe('Populate Index', () => {
    it('verifies that the index is created once the JSON file has been read ',
     () => {
       expect(t.createIndex(validFile, 'books.json').alice).toBeDefined();
     });
    it('verifies the index maps the string keys to the correct objectsin the JSON array ', () => {
      expect(t.createIndex(validFile, 'books.json').alice).toEqual([0]);
      expect(t.createIndex(validFile, 'books.json').a).toEqual([0, 1]);
    });
  });
  describe('Search index', () => {
    it('t verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query ', () => {
      expect(t.search('books.json', 'and')).toEqual({ and: [0, 1] });
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
 * A method that searches for words in an index
 * @param {string} filename is the name of the file to be searched
 * @param {string} term is what to search for
  * @return {Object} Returns an Object of the search result.
 */
  search(filename, ...term) {
    const name = filename.replace(/\.json|\.|\s/g, '');
    term = term.toString().toLowerCase().match(/\w+/g);
    const result = {};
    term.forEach((word) => {
     // for (let key in this.index[name]){
      Object.keys(this.index[name]).forEach((key) => {
        if (word === key) {
          result[key] = this.index[name][key];
        }
      });
    // }
    });
    return result;
  }
  /**
 * A method to retun a created index
 * @param {string} file is the name of the file to me indexed
 * @param {string} filename
  * @return {Object} Returns an Object containing the created Index.
 */
  createIndex(file, filename) {
    const createdObj = {};
    filename = filename || 'allBooks';
    let splittedText = [];
    // let splittedTitle = [];
    const count = [];
    file.forEach((document, index) => {
      count.push(index);
      splittedText = document.text.toLowerCase().match(/\w+/g);
      splittedText = this.removeDuplicates(splittedText);
      splittedText.forEach((word) => {
        if (createdObj[word] === undefined) {
          const indices = [];
          indices.push(index);
          createdObj[word] = indices;
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
 * A method to retun a created index
 * @param {string} file is the name of the file to me indexed
  * @return {string} Returns an Object containing the created Index.
 */
  static verify(file) {
    if (file.length === 0) {
      return 'File empty';
    }
    if (JSON.stringify(file[0]) === undefined) {
      return 'Not a JSON file';
    } return 'valid';
  }
  /**
 * A method to retun a created index
 * @param {string} index is the name of the file to me indexed
  * @return {Object} Returns an Object containing the created Index.
 */
  static sortObj(index) {
    const sortedKeys = Object.keys(index).sort();
    const sortedObject = {};  // Object that will contain the sorted object
    sortedKeys.forEach((key) => {
      sortedObject[key] = index[key];
    });
    return (sortedObject);
  }
  /**
 * A method to retun a created index
 * @param {array} array is the name of the file to me indexed
  * @return {array} Returns an Object containing the created Index.
 */
  static removeDuplicates(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = i + 1; j < array.length; j += 1) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
        }
      }
    }
    return array;
  }
}

},{}]},{},[2])