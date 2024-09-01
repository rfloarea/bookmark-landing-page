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
};

function createNewBookmark() {
  const url = urlInput.value;

  const newBookmark = document.createElement('li');
  newBookmark.textContent = `${url}`;
  bookmarkList.appendChild(newBookmark);

  createBookmarkButtonGroup(newBookmark, url)

  urlInput.value = '';
};

function handleGoToLink(url) {
  console.log(url, ' clicked');
  window.open(url, '_blank');
};

function handleEditBookmark(newBookmark) {
  console.log(newBookmark, ' edited');
  const url = prompt('Edit the url');
  newBookmark.textContent = url;

  createBookmarkButtonGroup(newBookmark, url)
};

function handleDeleteBookmark(newBookmark) {
  console.log(newBookmark, ' deleted')
  newBookmark.remove()
};

function createBookmarkButtonGroup(newBookmark, url) {

  // give them names
  const goToBookmarkBtn = document.createElement('button');
  const editBookmarkBtn = document.createElement('button');
  const deleteBookmarkBtn = document.createElement('button');

  // give them words
  goToBookmarkBtn.textContent = 'Go to link';
  editBookmarkBtn.textContent = 'Edit';
  deleteBookmarkBtn.textContent = 'Delete';

  // give them a home
  newBookmark.appendChild(goToBookmarkBtn);
  newBookmark.appendChild(editBookmarkBtn);
  newBookmark.appendChild(deleteBookmarkBtn);

  // give them life
  goToBookmarkBtn.addEventListener('click', () => handleGoToLink(url));
  editBookmarkBtn.addEventListener('click', () => handleEditBookmark(newBookmark));
  deleteBookmarkBtn.addEventListener('click', () => handleDeleteBookmark(newBookmark));
}