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
    this.documentTitle = {};
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
      Object.keys(this.index[name]).forEach((key) => {
        if (word === key) {
          result[key] = this.index[name][key];
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
    const createdObj = {};
    filename = filename || 'allBooks';
    let splittedText = [];
    const title = [];
    const count = [];
    file.forEach((document, index) => {
      count.push(index);
      title.push(document.title);
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
    this.documentTitle[filename] = title;
    return this.index[filename];
  }
  /**
 * A method to retun a created index
 * @param {string} file is the name of the file to me indexed
  * @return {string} Returns an Object containing the created Index.
 */
  verify(file) {
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
  sortObj(index) {
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
