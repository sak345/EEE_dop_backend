const express = require('express')
const router = express.Router()

const { protect, roles } = require('../middleware/auth')
const {
  getall,
  getone,
  create,
  updateuser,
  getalluser,
  getoneuser,
  deleteuser,
  downloadPapers,
} = require('../controllers/adminFunc')
const { createAccessRequest, getAccessRequests, updateAccessRequest, deleteAccessRequest } = require('../controllers/accessRequests');


router.route('/paper/getall').get(protect, roles, getall)
router.route('/paper/getone').get(protect, roles, getone)
router.route('/paper/download').post(protect, roles, downloadPapers)
router.route('/user/create').post(protect, roles, create)
router.route('/user/update').patch(protect, roles, updateuser)
router.route('/user/getall').get(protect, roles, getalluser)
router.route('/user/getone').get(protect, roles, getoneuser)
router.route('/user/delete').delete(protect, roles, deleteuser)
router.route('/access-requests').post(createAccessRequest)
router.route('/access-requests').get(protect, roles, getAccessRequests)
router.route('/access-requests').put(protect, roles, updateAccessRequest)
router.route('/access-requests/:id').delete(protect, roles, deleteAccessRequest);


module.exports = router
