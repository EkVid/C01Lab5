test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
  const response = await fetch(`${SERVER_URL}/getAllNotes`);
  const data = await response.json();

  expect(data.data).toEqual([]);
  expect(response.status).toBe(200);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  for (let i = 0; i < 2; i++) {
    await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${i}`,
        title: `${i} Note`,
        content: `Content of the ${i} note`,
        color: "white",
      }),
    });
  }

  const response = await fetch(`${SERVER_URL}/getAllNotes`);
  const data = await response.json();

  expect(data.data.length).toBe(2);
  expect(response.status).toBe(200);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note",
      content: "This is a test note content",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId; // Retrieve the newly generated note ID
  expect(noteId).toBeDefined();

  response = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
  });
  expect(response.status).toBe(200);
  const deletionBody = await response.json();
  expect(deletionBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note",
      content: "This is a test note content",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId; // Retrieve the newly generated note ID
  expect(noteId).toBeDefined();

  const updatedTitle = "Updated Test Note";
  const updatedContent = "This is the updated content of the test note.";
  const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
      content: updatedContent,
    }),
  });
  const NoteResponse = await patchNoteResponse.json();
  expect(patchNoteResponse.status).toBe(200);
  expect(NoteResponse.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note 2",
      content: "This is a test note content 2",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId; // Retrieve the newly generated note ID
  expect(noteId).toBeDefined();

  const updatedTitle = "Updated Test Note 2";
  const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
    }),
  });

  expect(patchNoteResponse.status).toBe(200);
  const NoteResponse = await patchNoteResponse.json();
  expect(NoteResponse.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note 3",
      content: "This is a test note content 3",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId; // Retrieve the newly generated note ID
  expect(noteId).toBeDefined();

  const updatedContent = "Updated Test Note content 3";
  const patchNoteResponse = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: updatedContent,
    }),
  });

  expect(patchNoteResponse.status).toBe(200);
  const NoteResponse = await patchNoteResponse.json();
  expect(NoteResponse.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here

  // delete all notes
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  // add a new note
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note",
      content: "This is a test note content",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId; // Retrieve the newly generated note ID
  expect(noteId).toBeDefined();

  // delete one note
  const deleteResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
  const deleteResponse2 = await deleteResponse.json();
  expect(deleteResponse2.response).toBe(`1 note(s) deleted.`);
  expect(deleteResponse.status).toBeDefined();
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here

  // add 3 notes
  for (let i = 0; i < 3; i++) {
    await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `${i}`,
        title: `${i} Note`,
        content: `Content of the ${i} note`,
        color: "white",
      }),
    });
  }

  const deleteResponse = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
  const deleteResponse2 = await deleteResponse.json();
  expect(deleteResponse2.response).toBe(`3 note(s) deleted.`);
  expect(deleteResponse.status).toBeDefined();
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Add a new note
  const newNoteResponse = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note",
      content: "This is a test note content",
    }),
  });

  expect(newNoteResponse.status).toBe(200);
  const noteCreationBody = await newNoteResponse.json();
  const noteId = noteCreationBody.insertedId;
  expect(noteId).toBeDefined();

  // Update the note color
  const updatedColor = "#FF0000";
  const updateResponse = await fetch(
    `${SERVER_URL}/updateNoteColor/${noteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: updatedColor,
      }),
    }
  );

  expect(updateResponse.status).toBe(200);
  const updateResponseBody = await updateResponse.json();
  expect(updateResponseBody.message).toBe("Note color updated successfully.");
});
