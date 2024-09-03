console.log("connected")

const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

const bookmarksInStorage = [
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

function addBookmark() {
  if (!titleInput.value || !urlInput.value) {
    return
  }
  let url = urlInput.value;
  let title = titleInput.value;
  // get stored items
  let bookmarksInStorage = JSON.parse(localStorage.getItem('bookmark-items'));
  // update our items array
  bookmarksInStorage.push({title: `${title}`, url: `${url}`,},)
  // clear local storage
  localStorage.clear();
  // set new items array into local storage
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage))
  console.log(bookmarksInStorage);
  // trigger rerender of items to DOM
  renderList(bookmarksInStorage)
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
function deleteAllBookmarks() {
  console.log('delete all bookmarks');
  localStorage.clear();
  // render empty list: BookmarkList();
};