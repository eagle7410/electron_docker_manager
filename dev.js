const ConsoleParser = require('./libs/ConsoleParser');

void async function doit() {
	let contaners = await  ConsoleParser.getDockerInfo();
	// TODO: clear
	console.log('contaners ', contaners);
}();
