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
				if (!data || data.length <= 0) {
					res.status(401).json({ message: 'Anda Tidak Memiliki User Akses' });
				} else {
					var item = data[0];
					if (!bcrypt.compareSync(req.body.password, item.password))
						res.status(401).json({ message: 'Anda Tidak Memiliki User Akses' });
					item.roles = [];
					data.forEach((element) => {
						item.roles.push(element.role);
					});

					var token = jwt.sign({ id: item.idusers, roles: item.roles }, config.secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					item.password = null;
					item.token = token;
					res.status(200).json(item);
				}
			},
			(err) => {
				res.status(401).json({ message: 'Anda Tidak Memiliki User Akses' });
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

router.get('/profile', [ authJwt.verifyToken ], async (req, res) => {
	try {
		contextDb.Users.profile().then(
			(response) => {
				res.status(200).json(response);
			},
			(err) => {
				res.status(400).json({ message: error.message });
			}
		);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
