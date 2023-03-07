let form = `
<form class="add-container">
  <label for="title">
    Title
    <input type="text" name="title" id="title-input">
  </label>
  <label for="author">
    Author
    <input type="text" name="author" id="author-input">
  </label>
  <label for="pages">
    Pages
    <input type="text" name="pages" id="pages-input">
  </label>
  <button type="button" id="add-book">Add book</button>
   
</form>
`;
const listBooksBtn = document.querySelector('#list-books-btn');
const addSectionBtn = document.querySelector('#add-book-btn');
const wrapperElement = document.querySelector('.wrapper');
const contentBox = document.querySelector('.content-box');

let books;

function init() {
  listBooksBtn.addEventListener('click', getBooks);
  addSectionBtn.addEventListener('click', printAddBookSection);
}

function handleInfoClick(e) {
  let index = e.currentTarget.id;
  getBookById(index);
}

function handleLoanClick(e) {
  let id = e.currentTarget.id;
  loanBook(id);
}

/****************************************************
 * Service
 */

function getBooks() {
  fetch('http://localhost:3000/books')
  .then((response) => response.json())
  .then((data) => {
    books = data;
    printBooks(books);
  });
}

function getBookById(id) {
  fetch('http://localhost:3000/books/' + id)
  .then((response) => response.json())
  .then((data) => {
    printBookInfo(data);
  });
}


function loanBook(id) {
  fetch('http://localhost:3000/books/loan/' + id)
  .then((response) => response.json())
  .then((data) => {
    printBookInfo(data)
  })
}


function addBook() {
  let bookTitle = (document.querySelector('#title-input').value);
  let bookAuthor = (document.querySelector('#author-input').value);
  let bookPages = (document.querySelector('#pages-input').value);

  console.log(bookTitle, bookAuthor, bookPages);
  
  let book = {
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages
  }

  
  fetch('http://localhost:3000/books/add', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(book)
  })
  .then(response => response.json())
  .then(data => {
    books = data;
    printBooks(books);
  });
}

/***************************************************
 *  Render
 */

function printBooks(incomingBooks) {
  clearContentbox();
  removeGoBackBtn();
  
  incomingBooks.map((book) => {
    let container = createListContainer();
    let titleElement = createTitleElement(book);
    let buttonElement = createInfoBtn(book);

    container.append(titleElement);
    container.append(buttonElement);
    contentBox.append(container);
  });

  renderClearBtn();
}

function printBookInfo(book) {
  removeGoBackBtn();
  removeClearBtn();
  clearContentbox();
  let container = createBookContainer(book);
  let titleElement = createTitleElement(book);
  let authorElement = createAuthorElement(book);
  let pagesElement = createPagesElement(book);
  let loanElement = createLoanElement(book);

  let backBtn = createBackBtn();

  container.appendChild(titleElement);
  container.appendChild(authorElement);
  container.appendChild(pagesElement);
  container.appendChild(loanElement);
  contentBox.appendChild(container);
  wrapperElement.appendChild(backBtn)
}

function renderClearBtn() {
  if (document.getElementById('clear-btn')) return;

  if (books.length >= 0) {
    let button = document.createElement('button');
    button.id = 'clear-btn'
    button.innerHTML = 'Clear list';
    button.addEventListener('click', clearContentbox);
    wrapperElement.appendChild(button);
  }
}

function printAddBookSection() {
  clearContentbox();
  contentBox.innerHTML = form;
  let addBtn = document.querySelector('#add-book');
  addBtn.addEventListener('click', addBook);
}

/***********************************************
 * Create elements
 */

function createListContainer() {
  let container = document.createElement('div');
  container.classList.add('list-container');
  return container;
}

function createBookContainer(book) {
  let container = document.createElement('div');
  container.classList.add('book-container');
  container.id = book.id;
  return container;
}

function createTitleElement(book) {
  let titleElement = document.createElement('h3');
  titleElement.innerText = book.title;
  return titleElement;
}

function createAuthorElement(book) {
  let element = document.createElement('h4');
  element.innerHTML = `Written by ${book.author}`;
  return element;
}

function createLoanElement(book) {
  let element;
  if (book.isAvailable) {
    element = document.createElement('button');
    element.classList.add('align-right');
    element.innerHTML = 'Loan book';
    element.id = book.id;
    element.addEventListener('click', handleLoanClick)
    return element;
  }
  else {
    element = document.createElement('p');
    element.innerHTML = 'Book is currently on loan.';
    return element;
  }
}

function createPagesElement(book) {
  let element = document.createElement('p');
  element.innerHTML = `The book has ${book.pages} pages.`;
  return element;
}

function createInfoBtn(book) {
  let button = document.createElement('button');
  button.innerHTML = 'Show book info';
  button.id = book.id;
  button.classList.add('info-btn');
  button.addEventListener('click', handleInfoClick);
  return button;
}

function createBackBtn() {
  let button = document.createElement('button');
  button.classList.add('info-btn');
  button.id = 'back-btn'
  button.innerHTML = 'Back to list'
  button.addEventListener('click', goBack);
  return button;
}

function goBack() {
  removeGoBackBtn();
  printBooks(books);
}

function clearContentbox() {
  removeClearBtn();
  contentBox.innerHTML = '';
}

function removeGoBackBtn() {
  let btn = document.querySelector('#back-btn');
  if (btn === null) return;
  btn.remove();
}

function removeClearBtn() {
  let btn = document.querySelector('#clear-btn');
  if (btn === null) return;
  btn.remove();
}

init();
