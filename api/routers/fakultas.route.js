const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', [ authJwt.verifyToken ], async (req, res) => {
	try {
		contextDb.Fakultas.get().then((result) => {
			res.status(200).json(result);
		});
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/byparentid/:Id', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.Fakultas.getByParentId(id).then((result) => {
			res.status(200).json(result);
		});
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Fakultas.post(data).then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					throw Error('Data Tidak Tersimpan');
				}
			});
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Fakultas.put(data).then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					throw Error('Data Tidak Tersimpan');
				}
			});
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:Id', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var id = req.params.Id;
		if (id) {
			contextDb.Fakultas.delete(id).then((result) => {
				if (result) {
					res.status(200).json(result);
				} else {
					throw Error('Data Tidak Tersimpan');
				}
			});
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
