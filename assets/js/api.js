const baseUrl = "https://api-notes-se17.onrender.com/api";
const form = document.getElementById("todoForm");
const ul = document.getElementById("todoList");

let updatingNoteId = null;

//  Fonction FETCH API
const createNote = async noteName => {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: noteName })
    });

    if (response.ok) {
      alert("Nouvelle note créée");
      form.reset(); // Vider le formulaire
      displayNotes();
    } else {
      console.error(
        "Erreur lors de la création de la note :",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de la note :", error);
  }
};

const getNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`, { method: "GET" });

    if (!response.ok) {
      console.error(
        "Erreur lors de la récupération des notes :",
        response.statusText
      );
      return;
    }
    // console.log(await response.json());
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des notes :", error);
  }
};

const deleteNote = async id => {
  try {
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      alert("Note deleted successfully...");
      displayNotes();
    } else {
      console.error(
        "Erreur lors de la suppression de la note :",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la note :", error);
  }
};

const updateNote = async (id, note) => {
  try {
    const response = await fetch(
      `${baseUrl}/notes/${"654a395d1502b90fb93fa73d"}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "rerer" })
      }
    );

    if (response.ok) {
      alert("Note updated successfully...");
    } else {
      console.error(
        "Erreur lors de la mise à jour de la note :",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la note :", error);
  }
};

//  Fonction Refresh


const displayNotes = async () => {
  const notes = await getNotes();
  ul.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");
    if (updatingNoteId === note._id) {
      // Display the updating mode for the selected note
      const input = document.createElement("input");
      input.type = "text";
      input.value = note.title;
      li.appendChild(input);

      const saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.className = "btn btn-warning";
      saveButton.addEventListener("click", () => {
        updateNote(note._id, input.value);
        updatingNoteId = null;
        displayNotes(); // Refresh the list
      });
      li.appendChild(saveButton);
    } else {
      // Display the note in normal mode
      const span = document.createElement("span");
      span.innerText = note.title;
      li.appendChild(span);

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.className = "btn btn-primary";
      updateButton.addEventListener("click", () => {
        updatingNoteId = note._id;
        displayNotes(); // Refresh the list
      });
      li.appendChild(updateButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", () => {
      deleteNote(note._id);
      updatingNoteId = null; // Clear updating mode when deleting
    });
    li.appendChild(deleteButton);

    ul.appendChild(li);
  });
};

form.onsubmit = event => {
  event.preventDefault(); // Arrêtez les actions par défaut lors de la soumission du formulaire
  const input = form.querySelector("input"); // Récupération de l'élément input à l'intérieur du formulaire
  const noteName = input.value.trim(); // Texte saisi dans l'input

  if (noteName) {
    createNote(noteName);
  }
};

window.onload = () => {
  displayNotes();
}; 
