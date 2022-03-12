const target = {
    patch: '\t'.repeat(6) + "this.emit('before-load');",
    lineNumber: 360,
    insertBefore: 'return [3 /*break*/, 2];',
    path: 'node_modules\\menubar\\lib\\Menubar.js'
}

const { version } = require('../node_modules/menubar/package.json');
if (version === '9.1.1') {
    patch();
} else {
    console.error(
        `Error: version mismatch while patching ${target.path}:
        Expected version: "9.1.1", Installed Version: "${version}"`
)}

function patch() {
    const { readFile, writeFile } = require("fs");

    readFile(target.path, (err, data) => {
        if (err) throw err;

        const lines = data.toString().split("\n").filter(Boolean);
        if (
            lines[target.lineNumber].endsWith(target.insertBefore) 
            && !lines.includes(target.patch)
        ) {
            lines.splice(target.lineNumber, 0, target.patch);
            writeFile(target.path, lines.join('\n'), 'utf8', err => console.log(err ?? 'Patched menubar/Menubar.js'));
        }
    });
}
