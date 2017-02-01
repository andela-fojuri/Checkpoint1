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
 * A method that searches for words in an index
 * @param {string} filename is the name of the file to be searched
 * @param {string} term is what to search for
  * @return {Object} Returns an Object of the search result.
 */
  search(filename, ...term) {
    if (!filename.includes('json')) {
      term.push(filename);
      Object.keys(this.index).forEach((key) => {
        filename = key;
      });
    } else {
      filename = filename.replace(/\.json|\.|\s/g, '');
    }
    term = term.toString().toLowerCase().match(/\w+/g); 
    const result = {};
    term.forEach((word) => {
      Object.keys(this.index[filename]).forEach((key) => {
        if (word === key) {
          result[key] = this.index[filename][key];
        }
      });
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
    if (file.length === 0) {
      return 'File empty';
    }
    if (JSON.stringify(file[0]) === undefined) {
      return 'Not a JSON file';
    }
    file.forEach((book) => {
      if (!book.title || !book.text) {
        return 'Your books must be an object of title and text';
      }
    });
    const createdObj = {};
    filename = filename || 'allBooks';
    let splittedText = [];
    const count = [];
    file.forEach((document, index) => {
      count.push(index + 1);
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
 * A method to sort an Object by Key
 * @param {string} index the Object to Sort
  * @return {Object} Returns the Sorted Object.
 */
  sortObj(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObject = {};
    sortedKeys.forEach((key) => {
      sortedObject[key] = obj[key];
    });
    return (sortedObject);
  }
  /**
 * A method to remove duplicate words in an array
 * @param {array} array the array to remove from
  * @return {array} Returns an array with no duplicate words.
 */
  removeDuplicates(array) {
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
