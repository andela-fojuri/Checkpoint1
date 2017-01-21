require("../testFiles/empty.json");


  describe('Inverted index test Suite: ', function () {
   var t = new Index();
    describe('Read book data', function () {  	
      it('should return "Empty File" for upload with no data ', function () {
        expect(t.verify("../testFiles/empty.json")).toEqual("File empty");
      });                                            
    });
  });

