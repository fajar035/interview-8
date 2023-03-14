const router = require('express').Router();
const usersController = require('../controllers');

router.get('/', (req, res) => res.send('<h1>API ready ..</h1>'));

router.get('/users', usersController.allUsers);
router.get('/user/:id', usersController.detailUser);
router.post('/user', usersController.addUser);
router.patch('/user/:id', usersController.updateUser);
router.delete('/user/:id', usersController.deleteUser);

module.exports = router;
