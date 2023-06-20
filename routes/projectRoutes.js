const express = require('express')
const router = express.Router()


const {
  createproject,
  getProjects, getGroupEmails,updateProject
 
} = require('../controllers/projectController')

const { protectgroup } = require('../middleware/authMiddlewaregroup')
/**
 * @swagger
 * /api/project/createproject:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group:
 *                 type: string
 *                 description: ID of the group associated with the task
 *               name:
 *                 type: string
 *                 description: Name of the task
 *               gitlink:
 *                 type: string
 *                 description: Git link of the task
 *               text:
 *                 type: string
 *                 description: Text value of the task
 *               assignedto:
 *                 type: string
 *                 description: User assigned to the task
 *               deadline:
 *                 type: string
 *                 description: Deadline of the task
 *               status:
 *                 type: string
 *                 enum: ['done', 'doing', 'to do']
 *                 description: Status of the task
 *             required:
 *               - group
 *               - name
 *               - gitlink
 *               - text
 *               - assignedto
 *               - deadline
 *               - status
 *     responses:
 *       200:
 *         description: Successful creation of the task
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/project/getProjects:
 *   post:
 *     summary: Get all tasks for a given group
 *     tags: [Task]
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
 *                 description: List of emails to filter the tasks
 *             required:
 *               - emails
 *     responses:
 *       200:
 *         description: Successful retrieval of tasks
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/project/getEmails:
 *   get:
 *     summary: Get emails of a group
 *     tags: [Group]
 *     parameters:
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the group to retrieve emails from
 *     responses:
 *       200:
 *         description: Successful retrieval of group emails
 *       400:
 *         description: Invalid request or group not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/project/updateProject:
 *   put:
 *     summary: Update a project
 *     tags: [Project]
 *     parameters:
 *       - name: taskid
 *         in: query
 *         description: ID of the project to update
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
 *                 description: New name for the project
 *               gitlink:
 *                 type: string
 *                 description: New git link for the project
 *               text:
 *                 type: string
 *                 description: New text for the project
 *               assignedto:
 *                 type: string
 *                 description: New assignee for the project
 *               deadline:
 *                 type: string
 *                 description: New deadline for the project
 *               status:
 *                 type: string
 *                 enum: [done, doing, to do]
 *                 description: New status for the project
 *     responses:
 *       200:
 *         description: Successful project update
 *       400:
 *         description: Invalid request or project not found
 *       500:
 *         description: Internal server error
 */

router.post('/createproject' ,createproject)
router.post('/getProject',getProjects)
router.get('/getEmails',getGroupEmails)
router.put('/updateProject',updateProject)









module.exports = router
