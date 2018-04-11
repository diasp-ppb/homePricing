var express = require('express')
const controller = require('../../controllers/search.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
	console.log('Time: ', Date.now())
	next()
})

// define the home page route
router
	.route('/')
	.get(controller.houses)

router
	.get('/route', function (req, res) {
  		res.send('TEST');
	})

module.exports = router