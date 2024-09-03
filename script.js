console.log("connected")

// Sources of data
const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkList = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', storeBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

// TODO: initialize local storage on window load

// initialize our data structure for local storage
const bookmarkItemList = [
  {
    markup: `<p>title<p>
    <a href="" target="_blank" class="url">url</a>
    <div class="button-group">
      <button>Edit</button>
      <button>Delete</button>
    </div>`
  },
]

// TODO: move our bookmark object into storage
function storeBookmark() {
  if (!urlInput.value) {
    return
  }
  console.log('add bookmark');

  localStorage.setItem('bookmark-list', JSON.stringify(bookmarkItemList))
  let storedBookmarks = JSON.parse(localStorage.getItem('bookmark-list'));
  console.log(storedBookmarks)

  let url = urlInput.value;
  let title = titleInput.value;

  Bookmark(url, title);
};

// TODO: render our list of bookmarks from storage
function BookmarkList() {
// if there are items in local storage,
// map over them using Bookmark() to render each item 
};

// TODO: clear local storage and trigger rerender
function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  localStorage.clear();
  // render empty list: BookmarkList();
};

// TODO: setup our Bookmark component
function Bookmark(url, title) {
  let bookmarkMarkup = 
  `
    <p>${title}<p>
    <a href="${url}" target="_blank" class="url">${url}</a>
    <div class="button-group">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  `
  const newBookmark = document.createElement('li');
  newBookmark.setAttribute('class', 'bookmark')
  bookmarkList.appendChild(newBookmark);
  newBookmark.innerHTML = bookmarkMarkup;
  urlInput.value = '';
  titleInput.value= '';
};

// TODO: edit specified bookmark item in storage,
// and trigger rerender of list
function handleEditBookmark() {
  // access correct item from storage
  // edit it
  // put it back
  // update list
};

// TODO: delete specified bookmark item from storage,
// and trigger rerender of list
function handleDeleteBookmark() {
  // find correct item
  // remove it: localStorage.removeItem(key)
  // update list of bookmarks
};