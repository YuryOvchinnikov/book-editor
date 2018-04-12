'use strict';

angular.module('bookEditorApp.bookListItemDirective', []).directive('bookListItem', function() {
    return {
        restrict: 'AE',
        templateUrl: 'src/components/book-list-item/book-list-item.html',
        scope: {
            book: '='
        }
    };
});

