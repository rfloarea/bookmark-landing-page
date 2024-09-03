console.log("connected")

const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', storeBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

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

window.onload = () => {
  console.log('page loaded')
  if (localStorage.length == 0) {
    localStorage.setItem('bookmark-objects', JSON.stringify(bookmarkObjects));
    console.log('local storage initialized')
  } else {
    const bookmarkObjects = JSON.parse(localStorage.getItem('bookmark-objects'));
    console.log('bookmarkObjects gotten from local storage', bookmarkObjects)
    renderList(bookmarkObjects)
  }
}

function renderList(bookmarks) {
  bookmarks.map((bookmark) => {
    const markup = Bookmark(bookmark.title, bookmark.url);
    const li = document.createElement('li');
    li.setAttribute('class', 'bookmark');
    li.innerHTML = markup;
    bookmarkListElement.appendChild(li);
  });
};

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