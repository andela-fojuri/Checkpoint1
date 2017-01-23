var app = angular.module('myApp', ['ngMessages']);
// app.controller('appCtrl', ['$scope', 'ModalService', ($scope, ModalService) => {
app.controller('appCtrl', ($scope) => {
  // $scope.createdIndex = {};
    $scope.name = [];
    $scope.invertedIndex = new Index();
    

    $scope.showPrompt = () => {
      ModalService.showModal({
        template: "myModalContent.html",
        parent: angular.element(document.body),
        controller: 'appCtrl',
      })
      .then((modal) => {
        modal.element.modal();
        modal.close.then(function(result) {
            $scope.message = "You said " + result;
        });
      });
    };


    $scope.uploader = () => {
      if (window.File && window.FileReader && window.FileList) {
        $scope.files = document.getElementById('upload').files[0];     
        // console.log($scope.files);
          $scope.name.push($scope.files.name);

          var r = new FileReader();
            r.onload = (e) =>{
              var file = e.target.result;  
              try{
                file = JSON.parse(file);
                $scope.invertedIndex.allBooks = $scope.invertedIndex.allBooks.concat(file);
                $scope.invertedIndex.createIndex(file, $scope.files.name);
                $scope.invertedIndex.createIndex($scope.invertedIndex.allBooks);
                console.log($scope.invertedIndex);
              }catch(e){
                console.log(e);
              }     
            }
            r.readAsText($scope.files);
      } else {
        console.log('The File APIs are not fully supported by your browser.');
      }

    };
    
    $scope.create=()=>{   
      $scope.e = document.getElementById("filename");    
      var filen = $scope.e.options[$scope.e.selectedIndex].value;
      $scope.createdIndex = $scope.invertedIndex.getIndex(filen.replace(/\.json|\.|\s/g, ''));
      $scope.count = $scope.invertedIndex.docNum[filen.replace(/\.json|\.|\s/g, '')];
    }


    $scope.search = () => {
      $scope.e = document.getElementById("filename");    
      var filen = $scope.e.options[$scope.e.selectedIndex].value;
      $scope.u = document.getElementById('term').value;
      $scope.createdIndex = $scope.invertedIndex.search(filen.replace(/\.json|\.|\s/g, ''),$scope.u);

    };

    $scope.displayDiv = () => {
      document.getElementById("crt").style.display = 'block';
    }

});
