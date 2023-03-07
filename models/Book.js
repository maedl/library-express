module.exports = class Book {

  constructor(title, author, pages, isAvailable, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAvailable = isAvailable;
    this.id = id;
  }
  loanBook = function() {
    this.isAvailable = false;
  }
}
