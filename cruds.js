var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');

var websitelist = [];
if (localStorage.getItem("websitelist") != null) {
  websitelist = JSON.parse(localStorage.getItem("websitelist"));
  displayProducts(websitelist);
}

function submitBookmark() {
  var website = {
    name: bookmarkNameInput.value.trim(),
    url: bookmarkURLInput.value.trim()
  };

  var isNameValid = website.name.length >= 3;
  var isUrlValid = isValidURL(website.url);

  if (!isNameValid || !isUrlValid) {
    showError();
    return;
  }

  websitelist.push(website);
  localStorage.setItem("websitelist", JSON.stringify(websitelist));
  clearForm();
  displayProducts(websitelist);
}

function showError() {
  document.getElementById('errorOverlay').style.display = 'flex';
}

function closeError() {
  document.getElementById('errorOverlay').style.display = 'none';
}

function isValidURL(url) {
  var pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  return pattern.test(url);
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

function displayProducts(arr) {
  var box = `
    <div class="con d-flex justify-content-center mt-4">
      <div class="text-center w-75">
        <table class="table mt-2">
          <thead>
            <tr>
              <th>Index</th>
              <th>Website Name</th>
              <th>Visit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
  `;

  for (var i = 0; i < arr.length; i++) {
    box += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>
          <a href="${arr[i].url}" target="_blank" class="btn btn-sm btn-visit">
            <i class="fa-solid fa-eye pe-2"></i> Visit
          </a>
        </td>
        <td>
          <button onclick="deleteProduct(${i})" class="btn btn-sm btn-delete">
            <i class="fa-solid fa-trash-can pe-2"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }

  box += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("websiteList").innerHTML = box;
}

function deleteProduct(index) {
  websitelist.splice(index, 1);
  localStorage.setItem("websitelist", JSON.stringify(websitelist)); 
  displayProducts(websitelist);
}
