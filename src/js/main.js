const app = angular.module('myApp', ['ngMessages']);

app.controller('appCtrl', ($scope) => {
  $scope.name = [];
  $scope.invertedIndex = new Index();
  $scope.uploader = () => {
    if (window.File && window.FileReader && window.FileList) {
      $scope.files = document.getElementById('upload').files;
      //console.log($scope.files);
      Object.keys($scope.files).forEach((file, index) => {
        $scope.name.push($scope.files[index].name);
        const reader = new FileReader();
        reader.onload = (e) => {
          let fileContent = e.target.result;
          try {
            fileContent = JSON.parse(fileContent);
            $scope.invertedIndex.allBooks = $scope.invertedIndex.allBooks.concat(fileContent);
            $scope.invertedIndex.createIndex($scope.invertedIndex.allBooks);
            $scope.invertedIndex.createIndex(fileContent, $scope.files[index].name);
          } catch (err) {
            // console.log(err);
          }
        };
        reader.readAsText($scope.files[index]);
      });
    } else {
      console.log('The File APIs are not fully supported by your browser.');
    }
  };
  $scope.create = () => {
    $scope.e = document.getElementById('filename');
    const filen = $scope.e.options[$scope.e.selectedIndex].value;
    $scope.createdIndex = $scope.invertedIndex.getIndex(filen.replace(/\.json|\.|\s/g, ''));
    $scope.count = $scope.invertedIndex.docNum[filen.replace(/\.json|\.|\s/g, '')];
    $scope.title = $scope.invertedIndex.documentTitle[filen.replace(/\.json|\.|\s/g, '')];
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
