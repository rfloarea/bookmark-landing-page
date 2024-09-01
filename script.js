console.log("connected")

// select our hardcoded DOM elements
const urlInput = document.querySelector('#url-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkList = document.querySelector('#bookmark-list');

// attach event listeners to them
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

// click handlers
function addBookmark() {
  console.log('add bookmark');
  createNewBookmark();
};
function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  while(bookmarkList.firstChild) {
    bookmarkList.removeChild(bookmarkList.lastChild)
  }
};


// create a new list item (bookmark)
function createNewBookmark() {
  const url = urlInput.value;

  // create necessary elements
  const newBookmark = document.createElement('li');
  const goToBookmarkBtn = document.createElement('button');
  const editBookmarkBtn = document.createElement('button');
  const deleteBookmarkBtn = document.createElement('button');

  // give them life
  newBookmark.textContent = `${url}`;
  goToBookmarkBtn.textContent = 'Go to link';
  editBookmarkBtn.textContent = 'Edit';
  deleteBookmarkBtn.textContent = 'Delete';

  // give them structure
  bookmarkList.appendChild(newBookmark);
  newBookmark.appendChild(goToBookmarkBtn);
  newBookmark.appendChild(editBookmarkBtn);
  newBookmark.appendChild(deleteBookmarkBtn);

  // give them orders
  goToBookmarkBtn.addEventListener('click', () => handleGoToLink(url));
  editBookmarkBtn.addEventListener('click', () => handleEditBookmark(newBookmark));
  deleteBookmarkBtn.addEventListener('click', () => handleDeleteBookmark(newBookmark));

  // clear input field
  urlInput.value = '';
};

// click handlers
function handleGoToLink(url) {
  console.log(url, ' clicked');
  window.open(url, '_blank');
};

function handleEditBookmark(newBookmark) {
  console.log(newBookmark, ' edited');
  const url = prompt('Edit the url');
  newBookmark.textContent = url;

  // recreate the buttons
  const goToBookmarkBtn = document.createElement('button');
  const editBookmarkBtn = document.createElement('button');
  const deleteBookmarkBtn = document.createElement('button');

  // fill em up
  goToBookmarkBtn.textContent = 'Go to link';
  editBookmarkBtn.textContent = 'Edit';
  deleteBookmarkBtn.textContent = 'Delete';
  // load em up
  newBookmark.appendChild(goToBookmarkBtn);
  newBookmark.appendChild(editBookmarkBtn);
  newBookmark.appendChild(deleteBookmarkBtn);
  // give em life
  goToBookmarkBtn.addEventListener('click', () => handleGoToLink(url));
  editBookmarkBtn.addEventListener('click', () => handleEditBookmark(newBookmark));
  deleteBookmarkBtn.addEventListener('click', () => handleDeleteBookmark(newBookmark));
};

function handleDeleteBookmark(newBookmark) {
  console.log(newBookmark, ' deleted')
  newBookmark.remove()
};