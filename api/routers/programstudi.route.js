const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', [ authJwt.verifyToken ], async (req, res) => {
	try {
		contextDb.ProgramStudi.get().then(
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

router.get('/:Id', [ authJwt.verifyToken ], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.ProgramStudi.getById(id).then(
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

router.get('/byparentid/:Id', async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.ProgramStudi.getByParentId(id).then(
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

router.get('/kaprodi/:Id', async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.ProgramStudi.getKaprodiByProdiId(id).then(
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
			contextDb.ProgramStudi.post(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						throw Error('Data Tidak Tersimpan');
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.ProgramStudi.put(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						throw Error('Data Tidak Tersimpan');
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:Id', [ authJwt.verifyToken, permit('admin') ], async (req, res) => {
	try {
		var id = req.params.Id;
		if (id) {
			contextDb.ProgramStudi.delete(id).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						throw Error('Data Tidak Tersimpan');
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else throw Error('Data Tidak Tersimpan');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
