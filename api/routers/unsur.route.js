const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');
const rx = require('rxjs');

router.get('/', [ authJwt.verifyToken ], (req, res) => {
	try {
		res.status(200).json({
			data: ' results'
		});
	} catch (error) {
		res.status(400).json({
			data: error
		});
	}
});

router.post('/', [ authJwt.verifyToken, permit('admin') ], (req, res) => {
	try {
		res.status(200).json({
			data: ' results'
		});
	} catch (error) {
		res.status(400).json({
			data: error
		});
	}
});

router.put('/', [ authJwt.verifyToken, permit('admin') ], (req, res) => {
	try {
		res.status(200).json({
			data: ' results'
		});
	} catch (error) {
		res.status(400).json({
			data: error
		});
	}
});

router.delete('/', [ authJwt.verifyToken, permit('admin') ], (req, res) => {
	try {
		res.status(200).json({
			data: ' results'
		});
	} catch (error) {
		res.status(400).json({
			data: error
		});
	}
});

module.exports = router;
