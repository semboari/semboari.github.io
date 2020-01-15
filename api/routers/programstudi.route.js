const express = require('express');
const contextDb = require('../db');
const router = express.Router();

router.post('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.ProgramStudi.post(id, data);
			if (result) {
			}
		}
	} catch (err) {}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.ProgramStudi.put(id, data);
			if (result) {
			}
		}
	} catch (err) {}
});

router.delete('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.ProgramStudi.delete(id);
			if (result) {
			}
		}
	} catch (err) {}
});

module.exports = router;
