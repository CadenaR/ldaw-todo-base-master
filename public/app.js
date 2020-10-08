function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id="task-${task.id}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <form action="/tasks/${task.id}/done" method="POST">
      <a id="done-${task.id}" href="#" onclick="completeTask(${task.id})" class="card-link">Done</a>
      <a href="#" onclick="deleteTask(${task.id})" class="card-link">Delete</a>
      </form>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function deleteTask(id) {
  $.ajax({
      url: '/tasks/' + id,
      method: 'DELETE',
  });

  document.getElementById('task-'+id).remove();
}

function completeTask(id) {
  $.ajax({
      url: '/task/complete/' + id,
      success: function (task) {
        document.getElementById('done-'+id).remove();
        document.getElementById('task-'+id).classList.add('bg-light');
      },
      error: function () {
      }
  });
}