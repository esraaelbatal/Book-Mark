let bookmarks = [];

function validateName() {
  let name = document.getElementById("siteName");
  if (name.value.trim().length >= 3) {
    name.classList.add("valid");
    name.classList.remove("invalid");
    return true;
  } else {
    name.classList.add("invalid");
    name.classList.remove("valid");
    return false;
  }
}

function validateURL() {
  let url = document.getElementById("siteURL");
  let regex = /^(https?:\/\/)([\w\-]+\.)+[\w]{2,}(\/.*)?$/;
  if (regex.test(url.value.trim())) {
    url.classList.add("valid");
    url.classList.remove("invalid");
    return true;
  } else {
    url.classList.add("invalid");
    url.classList.remove("valid");
    return false;
  }
}

function addBookmark() {
  let nameValid = validateName();
  let urlValid = validateURL();

  if (!nameValid || !urlValid) {
    document.getElementById("alertBox").classList.remove("hidden");
    return;
  }

  let name = document.getElementById("siteName").value.trim();
  let url = document.getElementById("siteURL").value.trim();

  let bookmark = { name, url };
  bookmarks.push(bookmark);
  displayBookmarks();
  clearForm();
}

function displayBookmarks() {
  let tableContent = "";
  bookmarks.forEach((bookmark, index) => {
    tableContent += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td><a href="${bookmark.url}" target="_blank">Visit</a></td>
        <td><button onclick="deleteBookmark(${index})">Delete</button></td>
      </tr>
    `;
  });
  document.getElementById("bookmarksList").innerHTML = tableContent;
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  displayBookmarks();
}

function clearForm() {
  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
  document.getElementById("siteName").classList.remove("valid", "invalid");
  document.getElementById("siteURL").classList.remove("valid", "invalid");
}

function closeAlert() {
  document.getElementById("alertBox").classList.add("hidden");
}

// يقفل الرسالة لو ضغطت على الخلفية السوداء
window.onclick = function(e) {
  let alertBox = document.getElementById("alertBox");
  if (e.target === alertBox) {
    closeAlert();
  }
};
