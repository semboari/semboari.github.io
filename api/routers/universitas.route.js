const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', [ authJwt.verifyToken ], async (req, res) => {
	try {
		const result = await contextDb.Universitas.get();
		res.status(200).json({
			data: result
		});
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.Universitas.insertuniversitas(data);
			if (result) {
			}
		}
	} catch (err) {}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.universitas.putuniversitas(data);
			if (result) {
			}
		}
	} catch (err) {}
});

router.delete('/', [ authJwt.verifyToken, permit('admin') ], async (resolve, res) => {
	try {
		var data = res.body;
		if (data) {
			var result = contextDb.universitas.deleteuniversitas(data);
			if (result) {
			}
		}
	} catch (err) {}
});

module.exports = router;
