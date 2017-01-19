
var app = angular.module('myApp', ['ngMaterial', 'angularModalService','ngMessages','material.svgAssetsCache']);
     app.controller('appCtrl', [ '$scope', 'ModalService', ($scope, ModalService) =>{
    //  app.controller('appCtrl', ($scope) =>{
      const  invertedIndex = new Index();
        $scope.showPrompt = ()=> { 
              ModalService.showModal({ 
              template: "myModalContent.html",
              parent: angular.element(document.body),
              controller:'appCtrl',
            })
            .then((modal)=> {
              modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
          });
          };


          $scope.uploader = () => {
            if (window.File && window.FileReader && window.FileList && window.Blob) { 
              $scope.f = document.getElementById('upload').value;
              $scope.file = document.getElementById('upload').files[0];  


              if($scope.file){   
                var r = new FileReader();
                r.onload = (e)=>{

                  $scope.contents = e.target.result;
                  //alert("Got the file.n"+"name: " + $scope.file.name + "n" +"type: " + $scope.file.type + "n" +"size: " + $scope.file.size + " bytesn"+ "starts with: " + $scope.contents);
                  if($scope.file.type.includes("json")){
                      //alert("File Uploaded");
                      $scope.createdIndex =  invertedIndex.createIndex($scope.contents);
                      $scope.title = $scope.createdIndex.Text;
                     



                     // console.log("scope is "+ $scope.createdIndex);
                  }
                  else{
                    alert("Kindly select a valid JSON file");
                  }
              };
              r.readAsText($scope.file);
                  
            }
            else{
              alert("Failed to load file");
            }

          }else{
            alert('The File APIs are not fully supported by your browser.');
          }
            
      };


            
           // $scope.isUploaded = true;
  
}]);

