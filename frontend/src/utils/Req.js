const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

/**
 * Send to server.
 * @method send
 * @param  {string} url
 * @param  {*} data
 * @param  {*} method
 * @param  {*} headers
 * @return {{Promise}}
 */
const send = (url, data, method, headers) => new Promise((resolve) => {
	const action = `${method}->${url}`;

	ipcRenderer.send(action, data);

	ipcRenderer.once(action + '-response', (event, data) => {
		// TODO: clear
		console.log(action + '-response' , data);
		resolve(data);
	})
});

/**
 * Send for save.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {{Promise}}
 */
const save = (url, data, headers) => send(url, data, 'post', headers);
/**
 * Send for get.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {{Promise}}
 */
const get = (url, data, headers) => send(url, data, 'get', headers);
/**
 * Send for delete.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {{Promise}}
 */
const move = (url, data, headers) => send(url, data, 'delete', headers);
/**
 * Send for update.
 * @method save
 * @param  {string} url
 * @param  {*} data
 * @param  {*} headers
 * @return {{Promise}}
 */
const update = (url, data, headers) => send(url, data, 'put', headers);
/**
 * Status response.
 * @type {{ok: string, err: string}}
 */
const status = {
	ok: 'OK',
	err: 'BAD'
};

/**
 * This do it request to server.
 * If response bad show standard message.
 * @param {function} method
 * @param {string} url
 * @param {*} data
 * @param {function} success
 * @param {function} fail
 * @param {object} headers
 */
const reqFull = (
	method,
	url,
	data = null,
	success,
	fail,
	headers = {}
) => new Promise(
	(ok, bad) => {
		success = success || ((r, ok, bad) => r._status === status.ok ? ok(r.data) : bad(r.data));
		fail = fail || ((e, bad) => bad('Sorry inner error. Send to support'))

		method(url, data, headers)
			.then(
				r => success(r, ok, bad),
				e => {
					console.log(`Response error in ${url} ${method.name}`, e);
					fail(e, bad, ok)
				}
			)
	});


export {save, get, move, update, status, reqFull};
