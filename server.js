const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 9090;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
//connectDB();
const userSchema = require("./schemas/user.schema");
const groupSchema = require("./schemas/goup.schema");
const projectSchema = require("./schemas/project.schema");


const app = express();
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: " MyBoost Project API Library  ",
			version: "1.0.0",
			description: "MyBoost Api Library",
		},
		servers: [
			{
				url: "http://localhost:9090",
			},
		],
        components: {
            schemas: {
                User: userSchema,
                Group: groupSchema,
                Task:projectSchema,
              },
          },
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs')

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/userp', require('./routes/profileRoute'));

app.use('/api/group', require('./routes/groupeRoute'));
app.use('/api/project', require('./routes/projectRoutes'));




app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));