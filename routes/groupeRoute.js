const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');

const {
  creategroup,
  updateEmail,
 
  getGroups,
  deleteGroup,
  getgroupwithdata,
  getallgroupwithdata
 
} = require('../controllers/groupController')



/**
 * @swagger
 * /api/group/creategroup:
 *   post:
 *     summary: Create a new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the group
 *               year:
 *                 type: string
 *                 description: Year of the group
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of emails associated with the group
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Group created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * api/group/getgroups:
 *   post:
 *     summary: Get groups
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emails:
 *                 type: string
 *                 format: email
 *                 description: List of emails to filter the groups
 *             required:
 *               - emails
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Group'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/group/deleteGroup/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags:
 *       - Group
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the group to delete
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after successful login
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       400:
 *         description: Invalid request or missing required parameters
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have permission
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.post('/creategroup', creategroup)
router.post('/getgroups',  getGroups)
router.delete('/deleteGroup/:id', deleteGroup)

router.post('/getgroupwithdata',  getgroupwithdata)
router.post('/getallgroupwithdata',  getallgroupwithdata)



router.patch('/updateEmail/:id', updateEmail)
//router.patch('/updateNameGroup/:id', updateNameGroup)
//router.patch('/updateGroup/:id', updateGroup)


module.exports = router
