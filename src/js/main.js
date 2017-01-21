var app = angular.module('myApp', ['ngMessages']);
// app.controller('appCtrl', ['$scope', 'ModalService', ($scope, ModalService) => {
app.controller('appCtrl', ($scope) => {
   $scope.createdIndex = {};
    

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
    
    $scope.invertedIndex = new Index();
      if (window.File && window.FileReader && window.FileList) {
        $scope.n = document.getSelection('upload');
        
        $scope.files = document.getElementById('upload').files;
        $scope.name = [];
        console.log($scope.files);
        for(i = 0; i <$scope.files.length; i++){
          $scope.name.push($scope.files.item(i).name);
          console.log($scope.name[i]);
          var label = document.createElement('label');
          var name = $scope.name[i];
          label.innerHTML = name +" uploded";
          document.getElementById("book").appendChild(label);
          var r = new FileReader();
            r.onload = (e) =>{
              var file = e.target.result;  
              try{
                file = JSON.parse(file);
                
                for(var j = 0;j<file.length;j++){
                  $scope.invertedIndex.allBooks.push(file[j]);
                }
                console.log(file);   
              }catch(e){
                alert("Kindly upload a JSON file");
              }     
            }
            r.readAsText($scope.files[i]); 
        }
        
        
       // console.log(invertedIndex.allBooks);
      } else {
        console.log('The File APIs are not fully supported by your browser.');
      }

    };

    $scope.create=()=>{
        $scope.createdIndex = $scope.invertedIndex.createIndex($scope.invertedIndex.allBooks);
        $scope.count = $scope.invertedIndex.count;
    }


    $scope.search = () => {
      //ind = invertedIndex.index;
      $scope.u = document.getElementById('term').value;
      console.log($scope.u);
      $scope.createdIndex = $scope.invertedIndex.search($scope.u);

    };

    $scope.displayDiv = () => {
      document.getElementById("crt").style.display = 'block';
    }

});
