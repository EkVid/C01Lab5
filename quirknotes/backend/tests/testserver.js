import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

let notes = [];

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors());

app.get("/getAllNotes", (req, res) => {
  res.json(notes);
});

app.post("/postNote", express.json(), (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: String(notes.length + 1), // Simple way to generate a new ID
    title,
    content,
  };
  notes.push(newNote);
  res.json({ response: "Note added succesfully.", note: newNote });
});

app.delete("/deleteNote/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const index = notes.findIndex((note) => note.id === noteId);
  if (index === -1) {
    return res.status(404).json({ error: "Note not found." });
  }
  notes.splice(index, 1);
  res.json({ response: `Document with ID ${noteId} deleted.` });
});

app.patch("/patchNote/:noteId", express.json(), (req, res) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;
  const note = notes.find((note) => note.id === noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found." });
  }
  if (title) note.title = title;
  if (content) note.content = content;
  res.json({ response: `Document with ID ${noteId} patched.`, note });
});

app.delete("/deleteAllNotes", (req, res) => {
  const count = notes.length;
  notes = []; // Reset the notes array
  res.json({ message: `${count} note(s) deleted.` });
});

app.patch("/updateNoteColor/:noteId", express.json(), (req, res) => {
  const { noteId } = req.params;
  const { color } = req.body;
  const note = notes.find((note) => note.id === noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found." });
  }
  note.color = color;
  res.json({ message: "Note color updated successfully.", note });
});
