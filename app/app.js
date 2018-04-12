'use strict';

angular.module('bookEditorApp', [
    'ngRoute',
    'LocalStorageModule',
    '720kb.datepicker',
    'ja.isbn',
    'storage.factory',
    'bookEditorApp.book-list',
    'bookEditorApp.book-edit',
    'bookEditorApp.bookListItemDirective'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/book-list', {
            templateUrl: 'src/components/book-list/book-list.html',
            controller: 'BookListCtrl',
            controllerAs: 'vm'
        })

        .when('/book-edit/:id', {
            templateUrl: 'src/components/book-edit/book-edit.html',
            controller: 'BookEditCtrl',
            controllerAs: 'vm'
        })

        .when('/book-edit', {
            templateUrl: 'src/components/book-edit/book-edit.html',
            controller: 'BookEditCtrl',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/book-list'});
}])
.config(function (localStorageServiceProvider) {
    if (localStorageServiceProvider.isSupported) {
        localStorageServiceProvider
            .setPrefix('bookEditorApp')
            .setStorageType('sessionStorage');
    }
});

