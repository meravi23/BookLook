app.factory("bookSrv", function ($q, $http, $log) {
    var counter = 0;

    class Book {

        constructor(titleOrObject, author, author2, translator, publisher, year, state,
            edition, isbn, category, subCategory, image, comment) {
            // if (arguments.length > 1) {
            //     this.title = titleOrObject;
            //     this.author = author;
            //     this.author2 = author2;
            //     this.translator = translator;
            //     this.publisher = publisher;
            //     this.year = year;
            //     this.state = state;
            //     this.edition = edition;
            //     this.isbn = isbn;
            //     this.category = category;
            //     this.subCategory = subCategory;
            //     this.image = image;
            //     this.comment = comment;
            // } else {
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
            this.comment = titleOrObject.comment
            // }
        }
    }


    class Book4Sale extends Book {

        constructor(titleOrObject, author, author2, translator, publisher, year, state,
            edition, isbn, category, subCategory, image, comment, price, seller) {
            super(titleOrObject, author, author2, translator, publisher, year, state,
                edition, isbn, category, subCategory, image, comment);
                
                this.id = ++counter;

            if (arguments.length > 1) {
                this.price = price;
                this.seller = seller;
            } else {
                this.price = titleOrObject.price;
                this.seller = titleOrObject.seller;
            }
        }
    }

    class bookLooked4 extends Book {

        constructor(titleOrObject, author, author2, translator, publisher, year, state,
            edition, isbn, category, subCategory, image, comment, postingPerson) {
            super(titleOrObject, author, author2, translator, publisher, year, state,
                edition, isbn, category, subCategory, image, comment);
                
                this.id = ++counter;

            if (arguments.length > 1) {
                this.postingPerson = postingPerson;
            } else {
                this.price = titleOrObject.price;
            }
        }
    }

    function getBookPosts() {
        var async = $q.defer();

        var books = [];

        $http.get("app/model/data/bookPosts.json").then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var book = new bookLooked4(response.data[i]);
                books.push(book);
            }

            async.resolve(books);

        }, function (err) {
            $log.error(err);
            async.reject(err);
        });

        return async.promise;
    }

    function getBooks4Sale() {
        var async = $q.defer();

        var books = [];

        $http.get("app/model/data/booksForSale.json").then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var book = new Book4Sale(response.data[i]);
                books.push(book);
            }

            async.resolve(books);

        }, function (err) {
            $log.error(err);
            async.reject(err);
        });

        return async.promise;
    }

    return {
        getBookPosts: getBookPosts,
        getBooks4Sale: getBooks4Sale,
        Book: Book,
        Book4Sale: Book4Sale
    }
});