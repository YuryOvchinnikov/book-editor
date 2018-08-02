'use strict';

angular.module('storage.factory', []).factory('storageFactory', function ($window, $http, $q, localStorageService) {

    return {
        getBookList: getBookList,
        getBookById: getBookById,
        saveBook: saveBook,
        removeBookById: removeBookById,
        getSortOptions: getSortOptions,
        saveSortOptions: saveSortOptions,
        getValidationRules: getValidationRules
    };

    function getBookList() {
        return $q(function (resolve, reject) {
            var bookList = localStorageService.get('bookList');
            if (!bookList) {
                initLocalStorage().then(function (result) {
                    resolve(result.bookList);
                });
            } else {
                resolve(bookList);
            }
        });
    }

    function getBookById(bookId) {
        return $q(function (resolve, reject) {
            var bookList = localStorageService.get('bookList');
            if (!bookList.length) {
                initLocalStorage().then(function (result) {
                    resolve(getBook(result.bookList, bookId));
                });
            } else {
                resolve(getBook(bookList, bookId));
            }
        });
    }

    function saveBook(book) {
        return $q(function (resolve, reject) {
            var bookList = localStorageService.get('bookList');

            if (book.id) {
                var bookIndex = getBooIndex(bookList, book.id);
                bookList[bookIndex] = book;
            } else { // new book
                var maxBookId = localStorageService.get('maxBookId');
                maxBookId ++;
                book.id = maxBookId;
                localStorageService.set('maxBookId', maxBookId);
                bookList.push(book);
            }

            localStorageService.set('bookList', bookList);
            resolve();
        });
    }

    function removeBookById(bookId) {
        return $q(function (resolve, reject) {
            var bookList = localStorageService.get('bookList');
            var bookIndex = getBooIndex(bookList, bookId);

            bookList.splice(bookIndex, 1);
            localStorageService.set('bookList', bookList);
            resolve();
        });
    }

    function getSortOptions() {
        return $q(function (resolve, reject) {
            resolve(localStorageService.get('sortOptions'));
        });
    }

    function saveSortOptions(sortOptions) {
        return $q(function (resolve, reject) {
            localStorageService.set('sortOptions', sortOptions);
            resolve();
        });
    }

    function getValidationRules() {
        return $q(function (resolve, reject) {
            $http.get('src/validation-rules.json').success(function (data) {
                resolve(data);
            });
        });
    }

    function initLocalStorage() {
        return $q(function (resolve, reject) {
            return $http.get('src/book-editor-data.json').success(function (data) {
                localStorageService.set('bookList', data.bookList);
                localStorageService.set('maxBookId', data.bookList.length);
                resolve(data);
            });
        });
    }


    function getBook(bookList, bookId) {
        for (var i = 0;  i < bookList.length; i++) {
            if (bookList[i].id === bookId) {
                return bookList[i];
            }
        }
    }


    function getBooIndex(bookList, bookId) {
        for (var i = 0;  i < bookList.length; i++) {
            if (bookList[i].id === bookId) {
                return i;
            }
        }
    }
});
