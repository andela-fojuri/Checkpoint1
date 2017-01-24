const app = angular.module('myApp', ['ngMessages']);

app.controller('appCtrl', ($scope) => {
  // $scope.createdIndex = {};
  $scope.name = [];
  $scope.invertedIndex = new Index();

  $scope.uploader = () => {
    if (window.File && window.FileReader && window.FileList) {
      $scope.files = document.getElementById('upload').files[0];
      if ($scope.files) {
        $scope.name.push($scope.files.name);
        const r = new FileReader();
        r.onload = (e) => {
          let file = e.target.result;
          try {
            file = JSON.parse(file);
            $scope.invertedIndex.allBooks = $scope.invertedIndex.allBooks.concat(file);
            $scope.invertedIndex.createIndex($scope.invertedIndex.allBooks);
            $scope.invertedIndex.createIndex(file, $scope.files.name);
          } catch (err) {
            // console.log(err);
          }
        };
        r.readAsText($scope.files);
      } else {
        alert('Kindly choose a file to upload');
        }
    } else {
       // console.log('The File APIs are not fully supported by your browser.');
    }
  };
  $scope.create = () => {
    $scope.e = document.getElementById('filename');
    const filen = $scope.e.options[$scope.e.selectedIndex].value;
    $scope.createdIndex = $scope.invertedIndex.getIndex(filen.replace(/\.json|\.|\s/g, ''));
    $scope.count = $scope.invertedIndex.docNum[filen.replace(/\.json|\.|\s/g, '')];
  };
  $scope.search = () => {
    $scope.e = document.getElementById('filename');
    const filen = $scope.e.options[$scope.e.selectedIndex].value;
    $scope.u = document.getElementById('term').value;
    $scope.createdIndex = $scope.invertedIndex.search(filen.replace(/\.json|\.|\s/g, ''), $scope.u);
  };
  $scope.displayDiv = () => {
    document.getElementById('crt').style.display = 'block';
  };
});
