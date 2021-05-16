const fs = require('fs');
const spawn = require("child_process").spawn;

const img_to_char = async (filepath) => {
	const pythonProcess = awaitspawn('python', ["./Model Training/evaluate.py", filepath], {
		cwd: process.cwd(),
		detached: true,
		stdio: "inherit"
	  });
    
	let output = "";
	
	pythonProcess.stdout.on('data', (c) => {
		return c.toString();
    });
	
	
	return output;
}

module.exports = {
    img_to_char: img_to_char
}