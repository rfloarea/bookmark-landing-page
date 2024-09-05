const urlInput = document.querySelector('#url-input');
const titleInput = document.querySelector('#title-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkListElement = document.querySelector('#bookmark-list');
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);



window.onload = () => {
  if (!localStorage) {
    const bookmarkItems = [];
    localStorage.setItem('bookmark-items', JSON.stringify(bookmarkItems));
  } else {
    const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
    renderList(bookmarkItems);
  }
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
  if (!titleInput.value || !urlInput.value) {return}
  let url = urlInput.value;
  let title = titleInput.value;
  let bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
  bookmarkItems.push({id: Math.random(), title: `${title}`, url: `${url}`,},)
  replaceStorageAndDOM(bookmarkItems);
};

function deleteAllBookmarks() {
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  localStorage.clear();
  const bookmarkItems = [];
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarkItems));
};

function handleDelete(nodeId) {
  const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
  const newArray = bookmarkItems.filter(item => item.id != nodeId);
  replaceStorageAndDOM(newArray);
};

function handleEdit(nodeId) {
  const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
  const newTitle = prompt('Edit title');
  const newUrl = prompt('Edit url');
  if (!newTitle || !newUrl) {return};
  const newArray = bookmarkItems.map(item => {
    if (item.id == nodeId) {
      return {...item, title: `${newTitle}`, url: `${newUrl}`};
    }
    return item;
  });
  replaceStorageAndDOM(newArray);
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

function replaceStorageAndDOM(newArray) {
  while (bookmarkListElement.firstChild) {
    bookmarkListElement.removeChild(bookmarkListElement.firstChild);
  };
  localStorage.clear();
  renderList(newArray);
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
};