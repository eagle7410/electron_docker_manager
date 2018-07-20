/* global module */
const ok = 'OK';
const err = 'BAD';

/**
 * Wrap for response send.
 * @method send
 * @param  {object} res
 * @param  {string} action
 * @param  {string} status
 * @param  {*} data
 *
 * @return {response}
 */
let send = (res, action, status, data = null) => {

	res.send(action, {
		_status : status,
		data : data
	});
};

module.exports = {
	/**
	 * Request types.
	 */
	reqTypes : {
		post : 'post',
		get  : 'get',
		del  : 'delete',
		put  : 'put'
	},
	/**
	 * Constant for response
	 * @type {{ok:string, err: string}}
	 */
	constant : {
		ok : ok,
		err : err
	},
	/**
	 * Response Success.
	 * @method ok
	 * @param  {object} res
	 * @param  {string} action
	 * @param  {*} data
	 * @return {response}
	 */
	ok : (res, action, data) => send(res, action, ok, data),
	/**
	 * Response fail.
	 * @method err
	 * @param  {object} res
	 * @param  {string} action
	 * @param  {*} data
	 * @return {response}
	 */
	err : (res, action, data) => send(res, action, err, data)
};
