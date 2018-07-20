
class ConsoleParser {
	static dockerOut (text) {
		let res = text
			.trim()
			.split('\n')
			.map(line =>
				line.replace(/(\s){3,}/g, '#|#')
					.split('#|#')
					.map(column => column.trim())
			);

		return res.shift();
	}
}

module.exports = ConsoleParser;
