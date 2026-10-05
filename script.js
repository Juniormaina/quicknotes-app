const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;

    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;

    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(document.createElement("br"));
    li.appendChild(date);

    notesList.appendChild(li);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newId =
    notes.length === 0
      ? 1
      : Math.max(...notes.map((note) => note.id)) + 1;

  const newNote = {
    id: newId,
    text: noteInput.value.trim(),
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  render();

  noteInput.value = "";
});
