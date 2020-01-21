const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', async (req, res) => {
	try {
		contextDb.Universitas.get().then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json(err);
	}
});

router.get('/:Id', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.Universitas.getById(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json(err);
	}
});
router.post('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Universitas.post(data).then(
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
		res.status(400).json(err);
	}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Universitas.put(data).then(
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
		res.status(400).json(err);
	}
});

router.delete('/:Id', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var id = req.params.Id;
		if (id) {
			contextDb.Universitas.delete(id).then(
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
		res.status(400).json(err);
	}
});

module.exports = router;
