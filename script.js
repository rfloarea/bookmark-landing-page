console.log("connected")

const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

const bookmarksInStorage = [];

window.onload = () => {
  console.log('page loaded')
  if (localStorage.length == 0) {
    localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage));
    renderList(bookmarksInStorage)
    console.log('local storage initialized')
  } else {
    const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmark-items'));
    console.log('bookmark-items from local storage', bookmarksInStorage)
    renderList(bookmarksInStorage)
    console.log('stored items rendered', bookmarksInStorage)
  }
}

function renderList(bookmarks) {
  // clear our node list
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  // rebuild our node list
  bookmarks.map((bookmark) => {
    const markup = Bookmark(bookmark.title, bookmark.url);
    const li = document.createElement('li');
    li.setAttribute('class', 'bookmark');
    li.setAttribute('id', bookmark.id);
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
      <button onclick="handleDelete(this.parentNode.parentNode.id)">Delete</button>
    </div>
  `
  return markup;
};

function addBookmark() {
  if (!titleInput.value || !urlInput.value) {
    return
  }
  let url = urlInput.value;
  let title = titleInput.value;
  let bookmarksInStorage = JSON.parse(localStorage.getItem('bookmark-items'));
  bookmarksInStorage.push({id: Math.random(), title: `${title}`, url: `${url}`,},)
  localStorage.clear();
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage))
  renderList(bookmarksInStorage)
};

function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  localStorage.removeItem('bookmark-items');
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage));
};

function handleDelete(nodeId) {
  console.log('nodeId', nodeId);
  // get stored array
  let storedItems = JSON.parse(localStorage.getItem('bookmark-items'));
  // create a new array of the objects whose id prop does not match the nodeId
  const newArray = storedItems.filter(x => x.id != nodeId);
  console.table(newArray);
  // store this new array
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
  // render this new array
  renderList(newArray);
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
