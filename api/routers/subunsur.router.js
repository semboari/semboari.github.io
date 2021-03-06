const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/:Id', [ authJwt.verifyToken ], async (req, res) => {
	var id = req.params.Id;
	try {
		contextDb.SubUnsur.get(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				throw new Error(err);
			}
		);
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.get('/getbyid/:Id', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.SubUnsur.getById(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.SubUnsur.post(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({ message: 'Data Tidak Tersimpan' });
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else res.status(400).json({ message: 'Data Tidak Tersimpan' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.SubUnsur.put(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({ message: 'Data Tidak Tersimpan' });
					}
				},
				(err) => {
					res.status(200).json(result);
				}
			);
		} else res.status(400).json({ message: 'Data Tidak Tersimpan' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:Id', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var id = req.params.Id;
		if (id) {
			contextDb.SubUnsur.delete(id).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({ message: 'Data Tidak Tersimpan' });
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else res.status(400).json({ message: 'Data Tidak Tersimpan' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
