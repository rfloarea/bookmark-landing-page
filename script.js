console.log("connected")

const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

const bookmarksInStorage = [];

// DONE
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

// DONE
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

// DONE
function Bookmark(title, url) {
  const markup = 
  `
    <p>${title}<p>
    <a href="${url}" target="_blank" class="url">${url}</a>
    <div class="button-group">
      <button onclick="handleEdit(this.parentNode.parentNode.id)">Edit</button>
      <button onclick="handleDelete(this.parentNode.parentNode.id)">Delete</button>
    </div>
  `
  return markup;
};

// DONE
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

// DONE
function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  localStorage.removeItem('bookmark-items');
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage));
};

// DONE
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

// DONE
function handleEdit(nodeId) {
  // get stored items array
  const storedItems = JSON.parse(localStorage.getItem('bookmark-items'));
  // get new values
  const newTitle = prompt('Edit title');
  const newUrl = prompt('Edit url');
  // match our node id with an item id
  const newArray = storedItems.map(item => {
    if (item.id == nodeId) {
      return {...item, title: `${newTitle}`, url: `${newUrl}`};
    }
    return item;
  });
  console.table(newArray); // works!
  // clear DOM
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  // render DOM
  renderList(newArray);
  // clear storage
  localStorage.clear();
  // set new storage
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
};