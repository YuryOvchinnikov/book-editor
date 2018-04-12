'use strict';

angular.module('bookEditorApp.book-list', []).controller('BookListCtrl', function(
    localStorageService, storageFactory) {

    var vm = this;

    vm.bookList = [];
    vm.sortOptions = {
        type: 'header', // 'header' or 'publicationYear'
        reverse: false
    };
    vm.sortBookList = sortBookList;

    activate();

    function activate () {
        getList();
        getSortOptions();
    }

    function getList () {
        storageFactory.getBookList().then(function(result) {
            vm.bookList = result;
        });
    }

    function getSortOptions () {
        storageFactory.getSortOptions().then(function(result) {
            if (result) {
                vm.sortOptions = result;
            }
        });
    }

    function sortBookList (type) {
        if (vm.sortOptions.type === type) {
            vm.sortOptions.reverse = !vm.sortOptions.reverse;
        } else {
            vm.sortOptions.reverse = false;
        }

        vm.sortOptions.type = type;
        storageFactory.saveSortOptions(vm.sortOptions).then(function(result) {

        });
    }
});
