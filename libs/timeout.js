/**
 * Promise for wait specified time.
 * @param {number} ms
 *
 * @return {Promise<any>}
 */
module.exports = ms => new Promise((end)=> {
	setTimeout(end, ms);
});
