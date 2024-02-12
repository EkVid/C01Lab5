import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let notes = []; // In-memory storage for notes

// Get all notes available
app.get("/getAllNotes", async (req, res) => {
  try {
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a note
app.post("/postNote", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "Title and content are both required." });
    }

    const newNote = {
      id: uuidv4(), // Generate a unique identifier for the note
      title,
      content,
      createdAt: new Date(),
    };
    notes.push(newNote);
    res.json({
      response: "Note added succesfully.",
      insertedId: newNote.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a note
app.delete("/deleteNote/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== noteId);

    if (initialLength === notes.length) {
      return res
        .status(404)
        .json({ error: "Unable to find note with given ID." });
    }
    res.json({ response: `Document with ID ${noteId} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patch a note
app.patch("/patchNote/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;

    let noteFound = false;
    notes = notes.map((note) => {
      if (note.id === noteId) {
        noteFound = true;
        return {
          ...note,
          ...(title && { title }),
          ...(content && { content }),
        };
      }
      return note;
    });

    if (!noteFound) {
      return res
        .status(404)
        .json({ error: "Unable to find note with given ID." });
    }

    res.json({ response: `Document with ID ${noteId} patched.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteAllNotes", async (req, res) => {
  try {
    const deletedCount = notes.length;
    notes = []; // Clear the array
    res.json({ response: `${deletedCount} note(s) deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/updateNoteColor/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { color } = req.body;

  let noteFound = false;
  notes = notes.map((note) => {
    if (note.id === noteId) {
      noteFound = true;
      return { ...note, color };
    }
    return note;
  });

  if (!noteFound) {
    return res.status(400).json({ error: "Invalid note ID." });
  }

  try {
    res.json({ message: "Note color updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Open Port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
