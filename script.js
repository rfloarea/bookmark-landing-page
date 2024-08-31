console.log("connected")

// init DOM elements

const urlInput = document.querySelector('#url-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkList = document.querySelector('#bookmark-list');

// attach even listeners to our DOM elements

addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

function addBookmark() {
  console.log('add bookmark');
  createNewBookmark();
};

function deleteAllBookmarks() {
  console.log('delete all bookmarks');
};

// create a new list item

function createNewBookmark() {
  const url = urlInput.value;
  const newBookmark = document.createElement('li');
  newBookmark.innerHTML = `
    <a>${url}</a>
    <button>edit</button>
    <button>delete</button>
    `
  bookmarkList.appendChild(newBookmark);
};