console.log("connected")

const urlInput = document.querySelector('#url-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkList = document.querySelector('#bookmark-list');

addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

function addBookmark() {
  if (!urlInput.value) {
    return
  }
  console.log('add bookmark');
  createNewBookmark();
};

function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  while(bookmarkList.firstChild) {
    bookmarkList.removeChild(bookmarkList.lastChild)
  }
  
  localStorage.clear();
};

function createNewBookmark() {
  // get url to play with
  const url = urlInput.value;
  // parent li element
  const newBookmark = document.createElement('li');
  newBookmark.setAttribute('class', 'bookmark')
  bookmarkList.appendChild(newBookmark);
  newBookmark.innerHTML = 
  `
    <a href="${url}" target="_blank" class="url">${url}</a>
    <div class="button-group">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  `
  // clear input
  urlInput.value = '';
};

// TODO
function handleEditBookmark() {
  // access correct item from storage
  // edit it
  // put it back
  // update list
};

// TODO
function handleDeleteBookmark() {
  // find correct item
  // remove it: localStorage.removeItem(key)
  // update list of bookmarks
};