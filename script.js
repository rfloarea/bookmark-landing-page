const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

const bookmarksInStorage = [];

window.onload = () => {
  if (!localStorage) {
    localStorage.setItem('bookmark-items', JSON.stringify(bookmarksInStorage));
    renderList(bookmarksInStorage)
  } else {
    const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmark-items'));
    renderList(bookmarksInStorage);
  }
};

function renderList(bookmarks) {
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
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
      <button onclick="handleEdit(this.parentNode.parentNode.id)">Edit</button>
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
  let storedItems = JSON.parse(localStorage.getItem('bookmark-items'));
  const newArray = storedItems.filter(item => item.id != nodeId);
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
  renderList(newArray);
};

function handleEdit(nodeId) {
  const storedItems = JSON.parse(localStorage.getItem('bookmark-items'));
  const newTitle = prompt('Edit title');
  const newUrl = prompt('Edit url');
  if (!newTitle || !newUrl) {return};
  const newArray = storedItems.map(item => {
    if (item.id == nodeId) {
      return {...item, title: `${newTitle}`, url: `${newUrl}`};
    }
    return item;
  });
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  renderList(newArray);
  localStorage.clear();
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
};