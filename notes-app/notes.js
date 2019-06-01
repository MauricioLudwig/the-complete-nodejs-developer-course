const chalk = require('chalk');
const fs = require('fs');

const FILE_NAME = 'notes.json';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    if (notes.length === 0) {
        console.log(chalk.yellow.inverse('No notes exist!'));
    } else {
        console.log(chalk.blue.inverse('Your Notes\n'));
        notes.forEach(note => console.log(chalk.green.inverse(note.title)))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    console.log(chalk.inverse('Reading note\n'));

    if (note) {
        console.log(chalk.blue.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(FILE_NAME, dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(FILE_NAME);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};
