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
    method: "DELETE", // Specify the method
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
  const noteId = 2;

  expect(false).toBe(true);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  expect(false).toBe(true);
});
