console.log("connected")

// Sources of data
const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
console.log(bookmarkListElement)
addBookmarkBtn.addEventListener('click', storeBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

// initialize our data structure for local storage
// currently dummy data
const bookmarkObjects = [
  {
    title: "Page Title 1",
    url: "url 1",
  },
  {
    title: "Page Title 2",
    url: "url 2",
  },
  {
    title: "Page Title 3",
    url: "url 3",
  },
]

// TODO: initialize local storage on window load
window.onload = () => {
  console.log('page loaded')
  if (localStorage.length == 0) {
    console.log(bookmarkObjects)
    localStorage.setItem('bookmark-objects', JSON.stringify(bookmarkObjects));
    // for testing
    renderList(bookmarkObjects)
  } else {
    const bookmarkObjects = JSON.parse(localStorage.getItem('bookmark-objects'));
    console.log(bookmarkObjects)
    renderList(bookmarkObjects)
  }
}

function renderList(bookmarks) {
  
  bookmarks.map((bookmark) => {
    const markup = Bookmark(bookmark.title, bookmark.url);
    console.log(markup)
    const fragment = document.createDocumentFragment();
    const li = document.createElement('li');
    li.setAttribute('class', 'bookmark');
    li.innerHTML = markup;
    fragment.appendChild(li);
    console.log(li)
    bookmarkListElement.appendChild(li);
  });

};

// TODO: use onclick handlers for edit and delete?
function Bookmark(title, url) {
  const markup = 
  `
    <p>${title}<p>
    <a href="${url}" target="_blank" class="url">${url}</a>
    <div class="button-group">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  `
  return markup;
};

// TODO
function handleEditBookmark(title, url) {
  // find object in array with matching title and url
  // get new data
  const newTitle = prompt("Edit title");
  const newUrl = prompt("Edit url");
  // update our array with new data
  // clear local storage
  // store newArray
  // trigger renderList(newArray)
};

// TODO
function handleDeleteBookmark() {
  // find correct item
  // remove it: localStorage.removeItem(key)
  // update list of bookmarks
};

// TODO
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

// TODO
function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  localStorage.clear();
  // render empty list: BookmarkList();
};