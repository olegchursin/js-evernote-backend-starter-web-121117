const Note = (function() {
  return class Note {
    constructor({ user_id, title, body, id }) {
      this.id = id;
      this.user_id = user_id;
      this.title = title;
      this.body = body;
    }

    renderSidebarNote() {
      // console.log("rendering sidebar", this.renderBody)

      let noteItem = document.createElement("li");
      noteItem.id = "note" + this.id;

      noteItem.addEventListener("click", this.renderBody.bind(this));

      let noteTitle = document.createTextNode(this.title);
      // console.log(this);

      let noteBodyItem = document.createElement("SPAN");
      let noteBody = document.createTextNode(
        this.body.substring(0, 150) + "..."
      );
      noteBodyItem.append(noteBody);
      noteItem.append(noteTitle);
      noteItem.append(noteBodyItem);

      return noteItem;
    }

    renderBody() {
      // grab HTML elements and assign variables
      let content = document.querySelector(".content");
      let toolbar = document.querySelector(".toolbar");

      // clear contents
      content.innerHTML = "";
      toolbar.innerHTML = "";

      // populate data
      let noteTitle = document.createElement("h3");
      noteTitle.innerHTML = this.title;
      // console.log(this);

      let noteBody = document.createElement("p");
      noteBody.innerHTML = this.body;

      content.append(noteTitle);
      content.append(noteBody);

      // crate Edit button
      let editNoteButton = document.createElement("button")
      editNoteButton.className = "ui green button editBtn"
      editNoteButton.id = "editBtn"
      editNoteButton.innerText = "Edit"
      editNoteButton.value = this.id

      // create Delete button
      let deleteNoteBtn = document.createElement("button");
      deleteNoteBtn.className = "ui red button";
      deleteNoteBtn.innerText = "Delete";
      deleteNoteBtn.value = this.id;

      //adding the event_listener to delete button
      toolbar.append(editNoteButton);
      toolbar.append(deleteNoteBtn);

      deleteNoteBtn.addEventListener("click", App.deleteNote.bind(this));
      editNoteButton.addEventListener('click', this.editNote.bind(this));

    } // renderBody ends

    editNote() {
      let editFormContainer = document.getElementById('editForm')
      console.log("title", this.title);
      console.log("body", this.body);
      editFormContainer.innerHTML = `
      <form id="note-form">
        <div class="ui input">
          <input id="note-title" type="text" name="title"  value="${this.title}">
        </div>
        <div class="ui form">
          <div class="field">
            <textarea id="note-body" name="body"  rows="6">${this.body}</textarea>
          </div>
        </div>
        <div>
          <button class="ui green labeled icon button" type="submit">
            Edit Note
            <i class="add icon"></i>
          </button>
        </div>
      </form>
      `
    }

  };
})();
