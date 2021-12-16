const inputBookName = document.querySelector("#bookname");
const inputAuthorName = document.querySelector("#authorname");
const inputCategory = document.querySelector("#category");
const inputImage = document.querySelector("#book-image");
let infoSubmitBtn;
const sectionRecentBooks = document.querySelector(".recent-books");
const sectionBookList = document.querySelector(".book-list");
let bookItems;
const regbtn = document.querySelector(".reg-btn");
const selectFilter = document.querySelector("#filter");
const searchbtn = document.querySelector(".search-input");
const selectSort = document.querySelector("#sort");
const addBookInfo = document.querySelector(".container-reg");
const container = document.querySelector(".container");
const registrationBtn = document.querySelector(".reg-btn");
const divOptions = document.querySelector("div.options");
const select = document.querySelectorAll("select");
const registerbutton=document.querySelector(".registerbutton");
document.addEventListener("DOMContentLoaded", displayBooks);

infoSubmitBtn = document.querySelector("#register");

infoSubmitBtn.addEventListener("click", regBook);
selectFilter.addEventListener("click", filterBooks);
searchbtn.addEventListener("keydown", searchBook);
searchbtn.addEventListener("click", showCross);
selectSort.addEventListener("click", sortBooks);
registrationBtn.addEventListener("click", displayModal);
registerbutton.addEventListener("click", displayModal);


for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("change", Scrolltobooks);
}

function displayModal() {
  container.classList.add("fade-container");
  addBookInfo.classList.add("show-container-reg");
}

function regBook() {
  let bookObj = {};
  let books;
  if (inputBookName.value !== "" && inputAuthorName.value !== "") {
    bookObj["BookName"] = inputBookName.value;
    bookObj["AuthorName"] = inputAuthorName.value;
    bookObj["Category"] = inputCategory.value;
    bookObj["id"] = Date.now() - 1639159398000;
    if (inputImage.value != "") bookObj["image"] = inputImage.value;
    else bookObj["image"] = "images/newdefaultbookcover.jpg";
    if (localStorage.getItem("Books") !== null) {
      books = JSON.parse(localStorage.getItem("Books"));
    } else {
      books = [];
    }
    books.push(bookObj);
    inputBookName.value = "";
    inputAuthorName.value = "";
    inputCategory.value = "";
    localStorage.setItem("Books", JSON.stringify(books));
  }
  window.location.reload();
}
function displayBooks(books) {
  if (!Array.isArray(books)) {
    if (localStorage.getItem("Books") !== null) {
      books = JSON.parse(localStorage.getItem("Books"));
    } else {
      books = [];
    }
  }

  for (let i = 0; i < books.length; i++) {
    let bookHTML = `<div class="book-info display">
    <div class="row">
      <div class="col-1 col">
        <div class="sno info-headings">${i + 1}</div>
      </div>
      <div class="col-2 col">
        <img src=${books[i]["image"]}></img>
        <p><span>Title: </span>${books[i]["BookName"]}</p>
      </div>
      <div class="col-3 col">
       
        <p><span>Author: </span>${books[i]["AuthorName"]}</p>
      </div>
      <div class="col-4 col">
        
        <p><span>Category: </span>${books[i]["Category"]}</p>
      </div>
      <div class="col-5 col">
      
      <p><span>ID: </span>${books[i]["id"]}</p>
      </div>
      <div class="col-6 col">
        <div class="delete-btn"><i class="fas fa-trash"></i></div>
        <div class="edit-btn"><i class="fas fa-pen"></i></div>
      </div>
      
    </div>
  </div>`;

    sectionBookList.insertAdjacentHTML("beforeend", bookHTML);
  }
  const dltbtn = document.querySelectorAll(".delete-btn");

  for (let i = 0; i < dltbtn.length; i++) {
    dltbtn[i].addEventListener("click", deleteBook);
  }
  const editbtn = document.querySelectorAll(".edit-btn");
  for (let i = 0; i < editbtn.length; i++) {
    editbtn[i].addEventListener("click", editBook);
  }
  bookItems = document.querySelectorAll(".book-info");
}
function deleteBook(e) {
  let divElement = e.target.closest(".book-info");
  let index;
  let id = divElement.querySelector(".col-5 p").innerText;
  console.log(id);
  books = JSON.parse(localStorage.getItem("Books"));
  for (let i = 0; i < books.length; i++) {
    let curId = books[i]["id"];
    if (id == curId) {
      index = i;
      break;
    }
  }

  books.splice(index, 1);
  localStorage.setItem("Books", JSON.stringify(books));
  window.location.reload();
}

function editBook(e) {
  container.classList.add("fade-container");
  addBookInfo.classList.add("show-container-reg");
  let divElement = e.target.closest(".book-info");
  let index;

  let id = divElement.querySelector(".col-5 p").innerText;

  books = JSON.parse(localStorage.getItem("Books"));
  for (let i = 0; i < books.length; i++) {
    let curId = books[i]["id"];

    if (id == curId) {
      index = i;

      break;
    }
  }

  const buttonEdit = document.querySelector("#edit");
  buttonEdit.addEventListener("click", editDetails);
  function editDetails() {
    if (inputBookName.value !== "" && inputAuthorName.value !== "") {
      books[index]["BookName"] = inputBookName.value;
      books[index]["AuthorName"] = inputAuthorName.value;
      books[index]["Category"] = inputCategory.value;
      if (inputImage.value !== "") books[index]["image"] = inputImage.value;
      localStorage.setItem("Books", JSON.stringify(books));
    }
    window.location.reload();
  }
}
function displayRecentBooks() {
  if (localStorage.getItem("Books") !== null) {
    books = JSON.parse(localStorage.getItem("Books"));
  } else books = [];
  let numberOfBooks = books.length;
  let newImage;
  for (let i = books.length - 1; i >= books.length - 4; i--) {
    if (books[i]["image"] === "images/newdefaultbookcover.jpg") {
      newImage = "images/blackbook.jpg";
    } else newImage = books[i]["image"];
    let recentBooks = `<div class="card">
     <div class=imgrecent><img src="${newImage}" alt="" /></div>
    <p class="categ">${books[i]["Category"]}</p>
    <p class="bookTitle">${books[i]["BookName"]}</p>
    <p class="author">${books[i]["AuthorName"]}</p>
  </div`;

    sectionRecentBooks
      .querySelector(".book-row")
      .insertAdjacentHTML("beforeend", recentBooks);
  }
}
displayRecentBooks();

function filterBooks(e) {
  let category = selectFilter.value;
  let curBookCategory;

  for (let i = 0; i < bookItems.length; i++) {
    bookItems[i].style.display = "none";
  }
  if (localStorage.getItem("Books") !== null) {
    books = JSON.parse(localStorage.getItem("Books"));
  } else books = [];
  let filteredBooks = [];

  for (let i = 0; i < books.length; i++) {
    if (books[i]["Category"] == category) {
      filteredBooks.push(books[i]);
    }
  }

  if (category === "all") {
    filteredBooks = [...books];
  }
  displayBooks(filteredBooks);
}
function hideAll() {
  for (let i = 0; i < bookItems.length; i++) {
    bookItems[i].style.display = "none";
  }
}
function showCross() {
  const crossbtn = searchbtn.nextElementSibling.querySelector(".fas");
  crossbtn.classList.remove("fa-search");

  crossbtn.classList.add("fa-times");

  crossbtn.addEventListener("click", () => {
    hideCross();
    hideAll();
    displayBooks();
  });

  function hideCross() {
    searchbtn.value = "";
    crossbtn.classList.remove("fa-times");
    crossbtn.classList.add("fa-search");
  }
}

function searchBook(e) {
  if (e.key === "Enter") {
    let bookTitle = e.target.value;
    if (localStorage.getItem("Books") !== null) {
      books = JSON.parse(localStorage.getItem("Books"));
    } else books = [];
    let bookSearchResult = [];
    for (let i = 0; i < books.length; i++) {
      if (bookTitle.toLowerCase() === books[i]["BookName"].toLowerCase()) {
        bookSearchResult.push(books[i]);
      }
    }
    for (let i = 0; i < bookItems.length; i++) {
      bookItems[i].style.display = "none";
    }
    displayBooks(bookSearchResult);
    sectionBookList.scrollIntoView({ behavior: "smooth" });
  }
}
function sortBooks(e) {
  books = JSON.parse(localStorage.getItem("Books"));
  let sessionBooks;

  let sortedbooks = [...books];
  if (e.target.value === "book-name") {
    sortedbooks.sort((a, b) => {
      if (a["BookName"] > b["BookName"]) return 1;
      if (a["BookName"] < b["BookName"]) return -1;
      else return 0;
    });
    sessionStorage.setItem("sessionBooks", JSON.stringify(sessionBooks));
    for (let i = 0; i < bookItems.length; i++) {
      bookItems[i].style.display = "none";
    }
    displayBooks(sortedbooks);
  } else if (e.target.value === "author-name") {
    sortedbooks.sort((a, b) => {
      if (a["AuthorName"] > b["AuthorName"]) return 1;
      if (a["AuthorName"] < b["AuthorName"]) return -1;
      else return 0;
    });
    sessionStorage.setItem("sessionBooks", JSON.stringify(sessionBooks));
    for (let i = 0; i < bookItems.length; i++) {
      bookItems[i].style.display = "none";
    }
    displayBooks(sortedbooks);
  }
}
function Scrolltobooks() {
  sectionBookList.scrollIntoView({ behavior: "smooth" });
}
