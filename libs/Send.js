const ok  = 'OK';
const err = 'BAD';

class Send {
	static response (res, action, status, data = null) {
		res.send(action, {
			_status : status,
			data : data
		});
	}

	static ok (res, action, data) {
		this.response(res, action, ok, data)
	}

	static err (res, action, data) {
		this.response(res, action, err, data)
	}

	/**
	 * Request types
	 * @return {{post: string, get: string, del: string, put: string}}
	 */
	static methods () {
		return {
			post : 'post',
			get  : 'get',
			del  : 'delete',
			put  : 'put'
		};
	}

	/**
	 * Constant for response
	 * @type {{ok:string, err: string}}
	 */
	static constant () {
		return {ok, err};
	}
}

module.exports = Send;
