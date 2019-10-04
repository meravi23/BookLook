app.factory("bookSrv", function ($q, $http, $log) {

    var books = [];  // books for sale
    var bookPosts = []; // books users are looking for
    var nextBookId;
    var bookPostsCalledAlready = false;
    var books4SaleCalledAlready = false;


    class Book {
        constructor(titleOrObject, id, author, author2, translator, publisher, year, state,
            edition, isbn, category, subCategory, image, comment) {
            // if (arguments.length > 1) {
            //     this.id = id;
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
            this.id = titleOrObject.id;
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
            this.comment = titleOrObject.comment;
            // }
        }
    }

    // a book4Sale object contains in addition price and seller name
    class Book4Sale extends Book {
        constructor(titleOrObject, id, author, author2, translator, publisher, year, state,
            edition, isbn, category, subCategory, image, comment, price, seller) {
            super(titleOrObject, id, author, author2, translator, publisher, year, state,
                edition, isbn, category, subCategory, image, comment);

            if (arguments.length > 1) {
                this.price = price;
                this.seller = seller;
            } else {
                this.price = titleOrObject.price;
                this.seller = titleOrObject.seller;
            }
        }
    }

    class BookLooked4 extends Book {
        constructor(titleOrObject, author
            /*, author2, translator, publisher, year, state,
                        edition, isbn, category, subCategory, image, comment, postingPerson*/
        ) {
            super(titleOrObject, author
                /*, author2, translator, publisher, year, state,
                                edition, isbn, category, subCategory, image, comment*/
            );

            //this.id = ++counter;

            if (arguments.length > 1) {
                this.postingPerson = postingPerson;
            } else {
                this.postingPerson = titleOrObject.postingPerson;
            }
        }
    }


    function getBookPosts() {
        var async = $q.defer();
        if (!bookPostsCalledAlready) {
            $http.get("app/model/data/bookPosts.json").then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var post = new BookLooked4(response.data[i]);
                    bookPosts.push(post);
                }
                nextBookId = response.data.length;
                bookPostsCalledAlready = true;
                async.resolve(bookPosts);
            },
                function (err) {
                    bookPostsCalledAlready = false;
                    $log.error(err);
                    async.reject(err);
                });

        } else {
            async.resolve(bookPosts);
        }
        return async.promise;
    }


    function addNewBookPost(title, author, postingPerson) {
        /*author2, translator, publisher, year, state, edition, isbn, category, subCategory, image , comment, postingPerson*/
        // image = "http://www.af.undp.org/etc/designs/UNDPGlobalDesign/clientlibs/digitallibrary/css/book-cover-placeholder.png";
        var async = $q.defer();

        var bookPost = {
            //"postId": postCounter,
            "title": title,
            "author": author,
            "createdBy": postingPerson
            // "img": image
        }

        var newBookPost = new BookLooked4(bookPost);
        bookPosts.unshift(newBookPost);
        //++postCounter;

        async.resolve(newBookPost);

        return async.promise;
    }

    function getBooks4Sale() {
        var async = $q.defer();
        if (books4SaleCalledAlready) {
            async.resolve(books);
        } else {
            books4SaleCalledAlready = true;
            $http.get("app/model/data/booksForSale.json").then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var book = new Book4Sale(response.data[i]);
                    books.push(book);
                }
                nextBookId = response.data.length;
                async.resolve(books);
            }, function (err) {
                books4SaleCalledAlready = false;
                $log.error(err);
                async.reject(err);
            });
        }
        return async.promise;
    }

    function getBookById(bookId) {
        var async = $q.defer();
        getBooks4Sale().then(function (books) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].id == bookId) {
                    console.log("book shown: " + books[i].title);
                    async.resolve(books[i]);
                }
            }
        }, function (err) {
            async.reject(err);
        })
        return async.promise;
    }

    class Category {
        constructor(object) {
            this.id = object.id;
            this.categoryName = object.catName;
            this.subcategories = object.subCategories;
        }
    }

    function getBookCategories() {
        var async = $q.defer();
        var categories = [];
        $http.get("app/model/data/bookCategories.json").then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                var category = new Category(res.data[i]);
                categories.push(category);
            }
            async.resolve(categories);
        }, function (err) {
            $log.error(err);
            async.reject(err);
        });
        return async.promise;
    }

    function getSellers() {
        var async = $q.defer();
        var sellers = [];
        $http.get("app/model/data/sellers.json").then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                sellers.push(res.data[i]);
            }
            async.resolve(sellers);
        }, function (err) {
            $log.error(err);
            async.reject(err);
        });
        return async.promise;
    }


    return {
        getBookPosts: getBookPosts,
        getBooks4Sale: getBooks4Sale,
        getBookById: getBookById,
        getBookCategories: getBookCategories,
        getSellers: getSellers,
        addNewBookPost: addNewBookPost,
        Book: Book,
        Book4Sale: Book4Sale,
        Category: Category
    }
});