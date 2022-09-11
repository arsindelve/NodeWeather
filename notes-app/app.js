const yargs = require('yargs');
const notes = require("./notes.js");

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Text of the note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (arguments) {
        notes.addNote(arguments.title, arguments.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (arguments) {
        notes.removeNote(arguments.title);
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note ',
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (args) {
       notes.readNote(args.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',

    handler() {
        notes.getNotes();

    }
});

yargs.parse();
