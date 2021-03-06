const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', [authJwt.verifyToken], async (req, res) => {
	try {
		contextDb.Dosen.get().then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/:Id', [authJwt.verifyToken], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.Dosen.getById(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/byuniversitasid/:Id', [authJwt.verifyToken], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.Dosen.getByUniversitasId(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/byprogdiid/:Id', [authJwt.verifyToken], async (req, res) => {
	try {
		var id = req.params.Id;
		contextDb.Dosen.getByProgdiId(id).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.get('/changerole/:Id/:role', [authJwt.verifyToken], async (req, res) => {
	try {
		var id = req.params.Id;
		var role = req.params.role;
		contextDb.Dosen.ChangeRole(id, role).then(
			(result) => {
				res.status(200).json(result);
			},
			(err) => {
				res.status(400).json(err);
			}
		);
	} catch (error) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.post('/', [authJwt.verifyToken, permit('admin', 'administrator')], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Dosen.post(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({
							message: 'Data Tidak Tersimpan'
						});
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else res.status(400).json({
			message: 'Data Tidak Tersimpan'
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.put('/', [authJwt.verifyToken, permit('admin', 'administrator')], async (req, res) => {
	try {
		var data = req.body;
		if (data) {
			contextDb.Dosen.put(data).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({
							message: 'Data Tidak Tersimpan'
						});
					}
				},
				(err) => {
					throw Error(err);
				}
			);
		} else res.status(400).json({
			message: 'Data Tidak Tersimpan'
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

router.delete('/:Id', [authJwt.verifyToken, permit('admin', 'administrator')], async (req, res) => {
	try {
		var id = req.params.Id;
		if (id) {
			contextDb.Dosen.delete(id).then(
				(result) => {
					if (result) {
						res.status(200).json(result);
					} else {
						res.status(400).json({
							message: 'Data Tidak Tersimpan'
						});
					}
				},
				(err) => {
					res.status(400).json(err);
				}
			);
		} else res.status(400).json({
			message: 'Data Tidak Tersimpan'
		});
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

module.exports = router;