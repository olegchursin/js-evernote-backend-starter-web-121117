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
      console.log(content);
      content.innerHTML = "";
      toolbar.innerHTML = "";

      // populate data
      let noteTitle = document.createElement("h3");
      noteTitle.innerHTML = this.title;
      // console.log(this);

      let noteBody = document.createElement("p");
      noteBody.innerHTML = this.body;

      content.className += " ui raised segment"
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

      //click here to delete note
      deleteNoteBtn.addEventListener("click", App.deleteNote.bind(this));
      //click here to see button to render form
      editNoteButton.addEventListener('click', this.displayEditNoteForm.bind(this));

    } // renderBody ends

    displayEditNoteForm(e) {
      e.stopPropagation();
      let editFormContainer = document.getElementById('editForm')
      editFormContainer.className = "ui raised segment"
      editFormContainer.innerHTML = `
      <form id="note-form">
        <h3>Edit Note</h3>
        <h4>Title:</h4>
        <div class="ui input">
          <input id="edit-note-title" type="text" name="title"  value="${this.title}">
        </div>
        <div class="ui form">
          <div class="field">
            <h4>Body:</h4>
            <textarea id="edit-note-body" name="body"  rows="6">${this.body}</textarea>
          </div>
        </div>
        <div id="editSubmitDiv">
        </div>
      </form>
      `
      let editSubmitBtn = document.createElement("button")
      editSubmitBtn.className = "ui green button"
      editSubmitBtn.id = "editSubmitBtn"
      editSubmitBtn.innerText = "Submit"
      let editBtnDiv = document.querySelector("#editSubmitDiv")

      editSubmitBtn.addEventListener("click", function(event){
          event.preventDefault()
      });
      editSubmitBtn.addEventListener("click", this.submitEdit.bind(this));
      editBtnDiv.append(editSubmitBtn)
    }

    submitEdit(){
      // e.preventDefault();
      // console.log("inside note", this.title);
      // console.log("inside note", this.body);
      console.log(this)
      let newTitle = document.getElementById('edit-note-title').value
      let newBody = document.getElementById('edit-note-body').value
      // debugger
      // let editSubmitBtn = document.getElementById('editSubmitBtn')
      NoteApi.editNote(newTitle, newBody, this.id)


    }



  };
})();
