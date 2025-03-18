const form = document.querySelector("#contactForm");
const docInput = document.querySelector("#name");
const addButton = document.querySelector("#submit");
const docList = document.querySelector(".docList");

let docLists = [];

function addDoc() {
  const docText = docInput.value.trim();
  if (docText === "") return; 

  const doc = {
    id: Date.now(),
    text: docText,
    completed: false,
  };

  docLists.push(doc);
  docInput.value = "";
  renderDoc();
}

function deleteDoc(id) {
  const confirmDelete = confirm("Do you want to delete this Document?");
  if (confirmDelete) {
    docLists = docLists.filter((doc) => doc.id !== id);
    renderDoc();
  }
}

function toggleCompleted(id) {
  docLists = docLists.map((doc) => {
    if (doc.id === id) {
      doc.completed = !doc.completed;
    }
    return doc;
  });
  renderDoc();
}

function renderDoc() {
  docList.innerHTML = "";

  docLists.forEach((doc) => {
    const docItem = document.createElement("li");
    const docText = document.createElement("span");
    const docDeleteButton = document.createElement("button");
    const docCheckbox = document.createElement("input");

    docText.textContent = doc.text;
    docDeleteButton.textContent = "Delete";
    docCheckbox.type = "checkbox";
    docCheckbox.checked = doc.completed;

    docDeleteButton.addEventListener("click", () => deleteDoc(doc.id));
    docCheckbox.addEventListener("change", () => toggleCompleted(doc.id));

    if (doc.completed) {
      docText.style.textDecoration = "line-through";
      docText.style.color = "gray";
    } else {
      docText.style.textDecoration = "none";
      docText.style.color = "black";
    }

    docItem.appendChild(docCheckbox);
    docItem.appendChild(docText);
    docItem.appendChild(docDeleteButton);

    docList.appendChild(docItem);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc();
});

renderDoc();
