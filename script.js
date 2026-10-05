const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];

function saveNotes() {
  localStorage.setItem("quicknotes-notes", JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render(notesToRender = notes) {
  notesList.textContent = "";

  if (notesToRender.length === 0 && searchInput.value.trim() !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  notesToRender.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;

    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = note.id;

    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(document.createElement("br"));
    li.appendChild(date);
    li.appendChild(document.createElement("br"));
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });

  updateCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newId =
    notes.length === 0
      ? 1
      : Math.max(...notes.map((note) => note.id)) + 1;

  const newNote = {
    id: newId,
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  saveNotes();
  render();

  noteInput.value = "";
});

notesList.addEventListener("click", (event) => {
  if (!event.target.matches("button")) {
    return;
  }

  const id = Number(event.target.dataset.id);

  notes = notes.filter((note) => note.id !== id);

  saveNotes();
  render();
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  render(filteredNotes);
});

const savedNotes = localStorage.getItem("quicknotes-notes");

if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

render();
