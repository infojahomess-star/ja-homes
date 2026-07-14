const fs = require("fs").promises;
const path = require("path");

const USERS_FILE = path.join(__dirname, "users.json");
const BOOKINGS_FILE = path.join(__dirname, "bookings.json");
const CONTACT_FILE = path.join(__dirname, "contact.json");

// In-memory queues to serialize filesystem access per file and prevent race conditions
const locks = {};

const executeSerialized = (filePath, action) => {
  if (!locks[filePath]) {
    locks[filePath] = Promise.resolve();
  }
  const next = locks[filePath].then(action);
  locks[filePath] = next.catch((err) => {
    console.error(`Error in serialized operation on ${filePath}:`, err);
  });
  return next;
};

const readJson = (filePath) => {
  return executeSerialized(filePath, async () => {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data || "[]");
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  });
};

const writeJson = (filePath, data) => {
  return executeSerialized(filePath, async () => {
    const tempPath = filePath + ".tmp";
    // Atomic write: write to temp file then rename (replace)
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tempPath, filePath);
  });
};

module.exports = {
  readUsers: () => readJson(USERS_FILE),
  writeUsers: (users) => writeJson(USERS_FILE, users),
  readBookings: () => readJson(BOOKINGS_FILE),
  writeBookings: (bookings) => writeJson(BOOKINGS_FILE, bookings),
  readContacts: () => readJson(CONTACT_FILE),
  writeContacts: (contacts) => writeJson(CONTACT_FILE, contacts),
};
