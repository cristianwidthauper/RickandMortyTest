// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


var contentElem = document.getElementById("content-modal-id");

function details(status, species, gender, image) {
    modal.style.display = "block";
    contentElem.innerHTML = `
        <div class="grid-item">
            <img src="${image}"/>
        </div>
        <div class="grid-item">
            <h4><strong>Status:</strong> ${status}</h4>
            <h4><strong>Species:</strong> ${species}</h4>
            <h4><strong>Gender:</strong> ${gender}</h4>
        </div>
    `
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}