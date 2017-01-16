var app = angular.module('myApp', ['ngMaterial','ngMessages','material.svgAssetsCache']);
     app.controller('appCtrl', function($scope, $mdDialog){
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showPrompt = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({ 
              template: '<md-dialog aria-label="List dialog">' +
           '  <md-dialog-content>'+
           '    <md-list>'+
           '      <md-list-item ng-repeat="item in items">'+
           '       <p>Number {{item}}</p>' +
           '      '+
           '    </md-list-item></md-list>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '<input type = "file" file-model = "myFile" id = "upload" accept=".json" ng-click="isUploaded = false" multiple/>'+
           '<button class="btn btn-default" ng-click = "uploader()">Upload File</button>'+
           '      Close Dialog' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };

          $scope.uploader = () => {
            $scope.isUploaded = false;
            $scope.index = new Index();
            const file = document.getElementById('upload').files[0];
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = (event) => {
              $scope.book = (event.target.result);
              const fileValidation = $scope.index.verify($scope.book);
              validFile = fileValidation[0];
              if (validFile) {
                $scope.titles = titlesList($scope.index.vbook.length);
                $scope.length = numToArray($scope.index.vbook.length);
              } else {
                alert(fileValidation[1]);
              }
            };
            $scope.isUploaded = true;
  };
      });