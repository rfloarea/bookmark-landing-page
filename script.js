console.log("connected")

// hardcoded elements
const urlInput = document.querySelector('#url-input');
const addBookmarkBtn = document.querySelector('#add-bookmark');
const deleteAllBookmarksBtn = document.querySelector('#delete-all');
const bookmarkList = document.querySelector('#bookmark-list');

// give them actions
addBookmarkBtn.addEventListener('click', addBookmark);
deleteAllBookmarksBtn.addEventListener('click', deleteAllBookmarks);

// callbacks for hardcoded elements
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
  
  localStorage.clear();
};

// fun stuff!
function createNewBookmark() {
  const url = urlInput.value;

  // parent li element
  const newBookmark = document.createElement('li');
  newBookmark.setAttribute('class', 'bookmark')
  bookmarkList.appendChild(newBookmark);
  
  // child p element
  const bookmarkLink = document.createElement('p');
  bookmarkLink.textContent = `${url}`;
  newBookmark.appendChild(bookmarkLink);

  // child button group element
  createBookmarkButtonGroup(newBookmark, url);

  // TODO: add to local storage
  // storage test stuff!!
  // what if we just create a new key for each url,
  // rather than creating an array object

  setNewItem(url);
  
  
  urlInput.value = '';
};

localStorage.setItem('counter', JSON.stringify(0));

function setNewItem(url) {
  let counter = JSON.parse(localStorage.getItem('counter'));
  console.log(counter);
  counter = counter + 1;
  console.log(counter);
  localStorage.setItem('url'+`${counter}`, JSON.stringify(`${url}`));
  localStorage.setItem('counter', JSON.stringify(counter));
};

// callbacks for dynamic elements
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

// well named function :P
function createBookmarkButtonGroup(newBookmark, url) {

  // give them names
  const buttonGroupDiv = document.createElement('div');
  const goToBookmarkBtn = document.createElement('button');
  const editBookmarkBtn = document.createElement('button');
  const deleteBookmarkBtn = document.createElement('button');

  // give them words
  goToBookmarkBtn.textContent = 'Go to link';
  editBookmarkBtn.textContent = 'Edit';
  deleteBookmarkBtn.textContent = 'Delete';

  // give them a home
  newBookmark.appendChild(buttonGroupDiv);
  buttonGroupDiv.appendChild(goToBookmarkBtn);
  buttonGroupDiv.appendChild(editBookmarkBtn);
  buttonGroupDiv.appendChild(deleteBookmarkBtn);

  // give them life
  goToBookmarkBtn.addEventListener('click', () => handleGoToLink(url));
  editBookmarkBtn.addEventListener('click', () => handleEditBookmark(newBookmark));
  deleteBookmarkBtn.addEventListener('click', () => handleDeleteBookmark(newBookmark));
}