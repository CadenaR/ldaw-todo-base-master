const router = require("express").Router();
const homepageController = require("../controllers/HomepageController");
const tasksController = require("../controllers/TasksController");

router.get("/", homepageController.index);

router.post("/tasks", tasksController.store);

router.delete("/tasks/:id", tasksController.delete);

router.get("/task/complete/:id", tasksController.complete);

router.get("/task/:id", tasksController.getSpecific);

router.get("/tasks", tasksController.get);

module.exports = router;
