const NoteApi = (function() {
  return class NoteApi {
    static fetchNotes() {
      return fetch("http://localhost:3000/api/v1/notes").then(res =>
        res.json()
      );
    }

    static postNote(noteTitle, noteBody) {
      return fetch("http://localhost:3000/api/v1/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1, // ask about it
          title: noteTitle,
          body: noteBody
        })
      }).then(res => res.json());
      //.then(json => console.log(json));
    }

    static deleteNote(note) {
      // console.log("whatever this is", this)
      return fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json"
        }
      });
    }

    static editNote(noteTitle, noteBody, noteID) {
      console.log("inside editNote API", noteID);
      console.log("title", noteTitle);
      return fetch(`http://localhost:3000/api/v1/notes/${noteID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: noteTitle,
          body: noteBody
        }) //closes body
      }).then(res => res.json())
      // .then(json => console.log(json));; //ends fetch
    } //ends editNote

  }; //these need to be here
})();
