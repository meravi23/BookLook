app.factory("bookSrv", function($q, $http) {

    function Book(titleOrObject, author, author2, translator, publisher, year, state, edition, isbn, category, subCategory, image) {
        if (arguments.length > 1) {
            this.title = titleOrObject;
            this.author = author;
            this.author2 = author2;
            this.translator = translator;
            this.publisher = publisher;
            this.year = year;
            this.state = state;
            this.edition = edition;
            this.isbn = isbn;
            this.category = category;
            this.subCategory = subCategory;
            this.image = image;
        } else {
            this.title = titleOrObject.title;
            this.author = titleOrObject.author;
            this.author2 = titleOrObject.author2;
            this.translator = titleOrObject.translator;
            this.publisher = titleOrObject.publisher;
            this.year = titleOrObject.year;
            this.state = titleOrObject.state;
            this.edition = titleOrObject.edition;
            this.isbn = titleOrObject.isbn;
            this.category = titleOrObject.category;
            this.subCategory = titleOrObject.subCategory;
            this.image = titleOrObject.image;
        }
    }

    function getBooks() {
        var async = $q.defer();

        var books = [];

        $http.get("app/model/data/books.json").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var book = new Book(response.data[i]);
                books.push(book);
            }

            async.resolve(books);

        }, function(err) {
            $log.error(err);
            async.reject(err);
        });

        return async.promise;
    }

    return {
        getBooks: getBooks,
        Book: Book
    }
});