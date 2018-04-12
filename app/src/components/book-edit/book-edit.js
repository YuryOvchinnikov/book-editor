'use strict';

angular.module('bookEditorApp.book-edit', []).controller('BookEditCtrl', function(
    $location, storageFactory, $routeParams) {

    var vm = this;
    var bookId = parseInt($routeParams.id);

    vm.book = null;
    vm.validationRules = null;
    vm.getCurrentYear = getCurrentYear;
    vm.saveBook = saveBook;
    vm.removeBook = removeBook;
    vm.addAuthor = addAuthor;
    vm.removeAuthor = removeAuthor;
    vm.cancel = cancel;

    activate();

    function activate () {
        bookId ? getBook() : getNewBook();
        getValidationRules();
    }

    function getBook () {
        storageFactory.getBookById(bookId).then(function(result) {
            vm.book = result;
        });
    }

    function getNewBook () {
        vm.book = {
            id: null,
            header: '',
            authors: [{name: '', surname: ''}],
            pages: '',
            publishingHouse: '',
            publicationYear: '',
            releaseDate: '',
            isbn: ''
        };
    }

    function getValidationRules () {
        storageFactory.getValidationRules().then(function(result) {
            vm.validationRules = result;
        });
    }

    function getCurrentYear () {
        return new Date().getFullYear();
    }

    function saveBook () {
        storageFactory.saveBook(vm.book).then(function(result) {
            $location.path('/book-list');
        });
    }

    function removeBook () {
        storageFactory.removeBookById(bookId).then(function(result) {
            $location.path('/book-list');
        });
    }

    function cancel () {
        $location.path('/book-list');
    }
    
    function addAuthor () {
        vm.book.authors.push({"name": "", "surname": ""});
    }

    function removeAuthor (index) {
        vm.book.authors.splice(index, 1);
    }
});
