

 

  describe('Inverted index test Suite: ', function () {
  	//require('../../src/inverted-index.js');
    describe('Read book data', function () {
    	require('../../src/inverted-index.js');
    	var u = require('../testFiles/empty.json');
    	var t = new Index();

      it('should return "Empty File" for upload with no data ', function () {
        expect(t.verify(u)).to.Equal("File empty");
      });
                                                                                                                                                                                                                                                                                                                                                                                                                                         
    });


  });

