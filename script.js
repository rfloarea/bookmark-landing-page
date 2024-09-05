const inputTitle = document.querySelector('#title-input');
const inputUrl = document.querySelector('#url-input');
const btnAddBookmark = document.querySelector('#add-bookmark');
const btnDeleteAllBookmarks = document.querySelector('#delete-all');
const elementBookmarkList = document.querySelector('#bookmark-list');
btnAddBookmark.addEventListener('click', handleAddBookmark);
btnDeleteAllBookmarks.addEventListener('click', handleDeleteAllBookmarks);

window.onload = () => {
  if (!localStorage) {
    const bookmarkItems = [];
    localStorage.setItem('bookmark-items', JSON.stringify(bookmarkItems));
  } else {
    const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
    renderList(bookmarkItems);
  }
  document.getElementById('title-input').focus();
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

function handleAddBookmark() {
  if (!inputTitle.value || !inputUrl.value) {return}
  const url = inputUrl.value;
  const title = inputTitle.value;
  const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
  bookmarkItems.push({id: Math.random(), title: `${title}`, url: `${url}`,},);
  replaceStorageAndDOM(bookmarkItems);
};

function handleDeleteAllBookmarks() {
  while (elementBookmarkList.firstChild) {
    elementBookmarkList.removeChild(elementBookmarkList.firstChild);
  };
  localStorage.clear();
  const bookmarkItems = [];
  localStorage.setItem('bookmark-items', JSON.stringify(bookmarkItems));
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

function handleDelete(nodeId) {
  const bookmarkItems = JSON.parse(localStorage.getItem('bookmark-items'));
  const newArray = bookmarkItems.filter(item => item.id != nodeId);
  replaceStorageAndDOM(newArray);
};

function renderList(bookmarks) {
  while (elementBookmarkList.firstChild) {
    elementBookmarkList.removeChild(elementBookmarkList.firstChild);
  };
  bookmarks.map((bookmark) => {
    const markup = Bookmark(bookmark.title, bookmark.url);
    const li = document.createElement('li');
    li.setAttribute('class', 'bookmark');
    li.setAttribute('id', bookmark.id);
    li.innerHTML = markup;
    elementBookmarkList.appendChild(li);
  });
};

function replaceStorageAndDOM(newArray) {
  while (elementBookmarkList.firstChild) {
    elementBookmarkList.removeChild(elementBookmarkList.firstChild);
  };
  localStorage.clear();
  renderList(newArray);
  localStorage.setItem('bookmark-items', JSON.stringify(newArray));
};