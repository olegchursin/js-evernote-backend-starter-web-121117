const App = (function() {
  return class App {
    static init() {
      console.log("Running app");
      this.renderNotes();
      let form = document.getElementById("note-form");
      form.addEventListener("submit", this.handleSubmit);
    }

    static renderNotes() {
      //sidebar
      let noteContainer = document.getElementById("note-list");

      NoteApi.fetchNotes().then(notes => {
        notes.forEach(function(noteJSON) {
          let note = new Note(noteJSON);

          noteContainer.prepend(note.renderSidebar());
        });
      });
    }

    static handleSubmit(event) {
      event.preventDefault();
      let noteTitleField = document.getElementById("note-title");
      let noteBodyField = document.getElementById("note-body");
      let noteTitle = noteTitleField.value;
      let noteBody = noteBodyField.value;

      NoteApi.postNote(noteTitle, noteBody).then(json => {
        let noteContainer = document.getElementById("note-list");
        let note = new Note({ user_id: 1, title: noteTitle, body: noteBody });

        noteContainer.prepend(note.renderSidebar());
        noteTitleField.value = "";
        noteBodyField.value = "";
      });
    }

    static deleteNote(event) {
      event.preventDefault(); //this is the event of the deletebutton

      // grab HTML elements and assign variables
      let content = document.querySelector(".content");
      let toolbar = document.querySelector(".toolbar");

      // clear contents of the full note section
      content.innerHTML = "";
      toolbar.innerHTML = "";

      let sideNote = document.getElementById(`note${this.id}`);
      // console.log("sidenote-- so here is the individual note", this);
      sideNote.remove();

      // console.log("this is the note in the delete note in the app", this)
      NoteApi.deleteNote(this);
    }

  };
})();
