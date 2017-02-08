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
    return (filename === undefined) ? this.index : this.index[filename];
  }

/**
 * Search
 * A method that searches for words in an index
 * @param {string} filename is the name of the file to be searched
 * @param {string} term is what to search for
 * @return {Object} Returns an Object of the search result.
 */
  search(filename, ...terms) {
    let result = {};
    terms = terms.toString().toLowerCase().match(/\w+/g);
    if (!filename.includes('json')) {
      terms.push(filename);
      Object.keys(this.index).forEach((file) => {
        result = this.callSearch(file, terms);
      });
    } else {
      filename = filename.replace(/\.json|\.|\s/g, '');
      result = this.callSearch(filename, terms);
    }
    return result;
  }

/**
 * callSearch
 * A method that searches for terms in all indexed files
 * @param {string} filename is the name of the file to be searched
 * @param {Array} terms is the array of terms to search for
 * @return {Object} Returns an Object of the search result.
 */
  callSearch(filename, terms) {
    const result = {};
    terms.forEach((term) => {
      Object.keys(this.index[filename]).forEach((key) => {
        if (term === key) {
          result[key] = this.index[filename][key];
        }
      });
    });
    return result;
  }

/**
 * createIndex
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
          createdObj[word] = [index];
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
 * sortObj
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
 * A method to remove duplicate words in an array
 * @param {array} array the array to remove duplicate words from
 * @return {array} Returns an array with no duplicate words.
 */
  removeDuplicates(array) {
    return array.filter((word, index) => array.indexOf(word) === index);
  }

/**
 * verify
 * A method to verify  a valid file
 * @param {array} fileContent the file to be verified
 * @return {String} Returns the result of verification.
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
        return 'Your book must be an object that contains title and text';
      }
    });
  }

}
