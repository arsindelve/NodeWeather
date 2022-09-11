const chalk = require('chalk');
const fs = require("fs");

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Here are all your notes:"));
    notes.forEach((n) => console.log(n.title));
}

const removeNote = (title) => {

    const notes = loadNotes();
    const nonMatchingNotes = notes.filter((n) => n.title !== title);

    if (nonMatchingNotes.length === notes.length) {
        console.log(chalk.red.inverse("No matching note found: " + title));
        return;
    }

    saveNotes(nonMatchingNotes);
    console.log(chalk.green.inverse("Note removed: " + title));
}

const addNote = (title, body) => {

    const notes = loadNotes();
    const found = notes.find((t) => t.title === title);

    if (found) {
        console.log(chalk.red.inverse("Title already exists"));
        return;
    }

    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const found = notes.find((t) => t.title === title);

    if (!found) {
        console.log(chalk.red.inverse("No matching note found: " + title));
        return;
    }

    console.log(found.body);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}