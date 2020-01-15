const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authJwt = require('./verifyToken.js');
const config = require('../auth/config');

router.get('/', async (req, res) => {
	try {
		const data = await contextDb.Users.get();
		res.status(200).json({
			data: data
		});
	} catch (error) {
		res.status(400).json({ message: err.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = req.body;
		contextDb.Users.login(user).then(
			(data) => {
				if (data && bcrypt.compareSync(req.body.password, data.password)) {
					var token = jwt.sign({ id: data.idusers, role: data.role }, config.secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					data.password = null;
					res.status(200).json({ user: data, token: token });
				} else {
					res.status(401).json({ message: 'Anda Tidak Memiliki User Akses' });
				}
			},
			(err) => {
				throw new Error(err.message);
			}
		);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post('/registerdosen', async (req, res) => {
	try {
		const user = req.body;
		user.password = bcrypt.hashSync(req.body.password, 8);
		contextDb.Users.registerAdmin(user).then(
			(data) => {
				if (data) {
					res.status(200).json(data);
				} else throw new Error('Registrasi Gagal');
			},
			(err) => {
				throw new Error(err.message);
			}
		);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
