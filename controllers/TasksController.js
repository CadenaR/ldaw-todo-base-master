const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Task.find(id).then((task) => {
    if (task == null) {
      res.status(404).send('Not found');
      return;
    }
    Task.delete(task.id)
      .then((id) => {
        res.status(200).send("success");
      });
  });
};

exports.complete = (req, res) => {
  let id = req.params.id;

  Task.find(id).then((task) => {
    if (task == null) {
      res.status(404).send('Not found');
      return;
    }

    let updateTask = {
      status: Task.DONE,
    };

    Task.update(task.id, updateTask)
      .then((id) => {
        res.status(200).send("success");
      });
  });
};

exports.get = (req, res) => {
  let tasks = Task.all().then((tasks) => {
    res.json(tasks)
  });
}

exports.getSpecific = (req, res) => {
  let id = req.params.id;
  Task.find(id).then((task) => {
    if (task == null) {
      res.status(404).send('Not found');
      return;
    }
    res.json(task)
  });
};