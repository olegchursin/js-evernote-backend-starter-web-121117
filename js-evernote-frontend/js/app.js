const App = (function() {
  return class App {
    static init() {
      console.log("Running app");
      this.renderNotes();
      let form = document.getElementById("note-form");
      form.addEventListener("submit", this.handleSubmit);
    }

    static renderNotes() { //sidebar
      let noteContainer = document.getElementById("note-list");

      NoteApi.fetchNotes().then(notes => {
        notes.forEach(function(noteJSON){
          let note = new Note(noteJSON)

          noteContainer.prepend(note.renderSidebar())
        })
      });
    }

    static handleSubmit(event) {
      event.preventDefault();
      let noteTitleField = document.getElementById("note-title");
      let noteBodyField = document.getElementById("note-body");
      let noteTitle = noteTitleField.value;
      let noteBody = noteBodyField.value;

      NoteApi.postNote(noteTitle, noteBody)
      .then(json => {
        let noteContainer = document.getElementById("note-list");
        let note = new Note({ user_id: 1, title: noteTitle, body: noteBody });

        noteContainer.prepend(note.renderSidebar());
        noteTitleField.value = ""
        noteBodyField.value = ""
      })
    }
  };
})();
