(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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


},{}]},{},[1]);
