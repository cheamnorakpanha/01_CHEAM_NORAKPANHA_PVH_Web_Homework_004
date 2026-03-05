const dialog = document.getElementById("taskDialog");
const dialogTitle = document.getElementById("dialogTitle");

const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("closeDialog");

const addBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");

const confirmDialog = document.getElementById("confirmDeleteDialog");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const table = document.getElementById("taskTable");

const tasks = [];

let selectedPriority = "";
let selectedStatus = "";

let editIndex = -1;
let deleteIndex = -1;

// Open Dialog
openBtn.addEventListener("click", () => {

  resetForm();

  dialogTitle.style.visibility = "visible";
  selectedPriority = "Medium";
  selectedStatus = "To Do";

  dialog.showModal();

});

// Close Dialog
closeBtn.addEventListener("click", () => {

  dialog.close();

});

// Priority
document.querySelectorAll(".priority").forEach(btn => {
  btn.addEventListener("click", () => {

    selectedPriority = btn.innerText;

    document.querySelectorAll(".priority").forEach(b => {
      b.className = "priority border-2 px-4 py-1 rounded-full transition duration-300";

      if (b.innerText === "High") {
        b.classList.add("border-red-500", "text-red-500");
      }

      if (b.innerText === "Medium") {
        b.classList.add("border-yellow-500", "text-yellow-500");
      }

      if (b.innerText === "Low") {
        b.classList.add("border-green-500", "text-green-500");
      }
    });

    if (selectedPriority === "High") {
      btn.classList.add("bg-red-500", "text-white");
    }

    if (selectedPriority === "Medium") {
      btn.classList.add("bg-yellow-400", "!text-white");
    }

    if (selectedPriority === "Low") {
      btn.classList.add("bg-green-500", "text-white");
    }
  });
});

// Status
document.querySelectorAll(".status").forEach(btn => {

  btn.addEventListener("click", () => {

    selectedStatus = btn.innerText;

    document.querySelectorAll(".status").forEach(b => {
      b.classList.remove("bg-cyan-400", "text-white");
    });

    btn.classList.add("bg-cyan-400", "text-white");

  });
});

// Add and Update Task
addBtn.addEventListener("click", () => {

  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please fill all fields");
    return;
  }

  const newTask = {
    task: task,
    priority: selectedPriority,
    status: selectedStatus
  };

  if (editIndex !== -1) {
    tasks[editIndex] = newTask;
    editIndex = -1;
    addBtn.innerText = "Add";
  } else {
    tasks.unshift(newTask);
  }

  renderTasks();
  dialog.close();
  resetForm();
});

// Render Table
function renderTasks() {

  table.innerHTML = "";

  tasks.forEach((t, index) => {

    const row = document.createElement("tr");

    row.className = "bg-white";

    let priorityColor = "";

    if (t.priority === "High") priorityColor = "text-red-500";
    if (t.priority === "Medium") priorityColor = "text-yellow-500";
    if (t.priority === "Low") priorityColor = "text-green-500";

    row.innerHTML = `
      <td class="px-16 py-6 rounded-l-lg text-xl font-bold">${t.task}</td>

      <td class="px-6 py-6 text-xl font-bold ${priorityColor}">
        ${t.priority}
      </td>

      <td class="px-6 py-6 text-xl font-bold">${t.status}</td>

      <td class="px-6 py-6 rounded-r-lg text-xl font-bold">
        <div class="flex justify-center gap-4">

          <i onclick="editTask(${index})"
          data-lucide="square-pen"
          class="text-purple-800 cursor-pointer"></i>

          <i onclick="deleteTask(${index})"
          data-lucide="trash-2"
          class="text-red-600 cursor-pointer"></i>

        </div>
      </td>
    `;
    table.appendChild(row);
  });
  lucide.createIcons();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Edit Task
function editTask(index) {

  const task = tasks[index];

  taskInput.value = task.task;

  selectedPriority = task.priority;
  selectedStatus = task.status;

  editIndex = index;

  dialogTitle.style.visibility = "hidden";
  addBtn.innerText = "Update";

  // Highlight Priority
  document.querySelectorAll(".priority").forEach(btn => {

    btn.classList.remove("bg-red-500", "bg-yellow-400", "bg-green-500", "text-white");

    if (btn.dataset.priority === selectedPriority) {

      if (selectedPriority === "High") {
        btn.classList.add("bg-red-500", "text-white");
      }

      if (selectedPriority === "Medium") {
        btn.classList.add("bg-yellow-400", "text-white");
      }

      if (selectedPriority === "Low") {
        btn.classList.add("bg-green-500", "text-white");
      }

    }

  });

  // Highlight Status
  document.querySelectorAll(".status").forEach(btn => {

    btn.classList.remove("bg-cyan-400", "text-white");

    if (btn.dataset.status === selectedStatus) {
      btn.classList.add("bg-cyan-400", "text-white");
    }

  });


  dialog.showModal();

}

// Reset Form
function resetForm() {

  taskInput.value = "";

  selectedPriority = "";
  selectedStatus = "";

  editIndex = -1;

  addBtn.innerText = "Add";

  document.querySelectorAll(".priority").forEach(btn => {
    btn.classList.remove(
      "bg-red-500", "bg-yellow-400", "bg-green-500", "text-white"
    );
  });

  document.querySelectorAll(".status").forEach(btn => {
    btn.classList.remove("bg-cyan-400", "text-white");
  });

}

// Delete Task
function deleteTask(index) {

  confirmDialog.showModal();

  confirmDeleteBtn.onclick = () => {

    tasks.splice(index, 1);

    renderTasks();

    confirmDialog.close();

  };

  cancelDeleteBtn.onclick = () => {

    confirmDialog.close();

  };
}

// Cancel Edit Button
cancelEditBtn.addEventListener("click", () => {

  dialog.close();

  resetForm();

});