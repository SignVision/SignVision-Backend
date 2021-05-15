const fs = require('fs');
const spawn = require("child_process").spawn;

const img_to_char = async (filepath) => {
	const pythonProcess = spawn('python', ["./Model Training/evaluate.py", filepath]);
    
	let output = "";
	
	pythonProcess.stdout.on('data', (c) => {
		output = c.toString();
    });
	
	
	return output;
}

module.exports = {
    img_to_char: img_to_char
}