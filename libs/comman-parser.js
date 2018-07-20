
const commandParse = text => text
	.trim()
	.split('\n')
	.map(line =>
		line.replace(/(\s){3,}/g, '#|#')
			.split('#|#')
			.map(column => column.trim())
	);


module.exports = {
	commandParse
};
