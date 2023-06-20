const express = require('express')
const router = express.Router()
const upload = require('multer')();
// const {multerConfig}=require ('../middleware/multerConfig')
const { protect } = require('../middleware/authMiddleware')

const {
  resetPassword,patchOnce,getOnce,updateUserPassword,uploadFile,uploadimage,multerConfig,

  getUser,editUser,forgot_password,reset_password_get,reset_password_post, updateUserInfo,
  
} = require('../controllers/profilecontroller');
// const { default: multerConfig } = require('../middleware/multer-config');

//const { protect } = require('../middleware/authMiddleware')



router.post('/editus', editUser)

router.post('/resetPwd', resetPassword)

router
.route('/forgot_password')
.post(forgot_password);

router
.route('/reset_password/:email/:token')
.get(reset_password_get);

router
.route('/reset_password/:email/:token')
.post(reset_password_post);

/*router
.route('/edit')
.patch(protect, patchOnce);*/




// router
// .route('/:id')
// .patch(putOnce);

//router.patch('/edit', protect,  putOnce);
router
.route('/get')
.get(protect, getOnce
  );

  /**
 * @swagger
 * /api/userp/editInfo/{userId}:
 *   patch:
 *     summary: Update user's profile infomation
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user
 *     responses:
 *       200:
 *         description: Successful profile update
 *       400:
 *         description: Invalid request or user not found
 *       500:
 *         description: Internal server error
 */

  /**
 * @swagger
 * /api/userp/editInfo/{id}:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update the password
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *     responses:
 *       200:
 *         description: Successful password update
 *       400:
 *         description: Invalid request or user not found
 *       500:
 *         description: Internal server error
 */


  router.route("/editInfo/:id").patch(updateUserInfo);
  router.route("/user").get(getUser);


  router.route("/editPass/:id").patch(updateUserPassword);
  router.route('/upload', upload.single('file'), uploadFile);
//router.route("/uploadimage").post(multerConfig, uploadimage);


  



module.exports = router
