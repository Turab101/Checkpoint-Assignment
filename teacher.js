import {updateCounts} from "./script.js";


export class Teacher {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
}




export function getTeachers() {
  return JSON.parse(localStorage.getItem('teachers') || '[]');
}

export function displayTeachers() {
  const teachers = getTeachers();
  const contentDiv = document.getElementById('main-content');
  contentDiv.innerHTML = `
    <h1 class="text-center my-4">Teacher Management</h1>
    <div class="row" id="teacher-list">
      ${teachers.map(teacher => `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Name: ${teacher.name}</h5>
              <p class="card-text">Subject: ${teacher.subject}</p>
              <button class="edit-teacher-btn btn btn-info" data-id="${teacher.id}">Edit</button>
              <button class="delete-teacher-btn btn btn-danger" data-id="${teacher.id}">Delete</button>
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div class="d-flex justify-content-center mt-4">
      <button id="add-teacher-btn" class="btn btn-primary">Add Teacher</button>
    </div>`;

  document.getElementById('add-teacher-btn').addEventListener('click', addTeacher);
  document.querySelectorAll('.edit-teacher-btn').forEach(btn => {
    btn.addEventListener('click', () => editTeacher(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.delete-teacher-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteTeacher(btn.getAttribute('data-id')));
  });
}






export function addTeacher() {
  const existingModal = document.getElementById('addTeacherModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalElement = document.createElement('div');
  modalElement.id = 'addTeacherModal';
  modalElement.className = 'modal fade';
  modalElement.tabIndex = '-1';
  modalElement.role = 'dialog';
  modalElement.setAttribute('aria-labelledby', 'addTeacherModalLabel');
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTeacherModalLabel">Add New Teacher</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="addTeacherForm">
            <div class="form-group">
              <label for="teacherName">Name</label>
              <input type="text" class="form-control" id="teacherName" required>
            </div>
            <div class="form-group">
              <label for="teacherSubject">Subject</label>
              <input type="text" class="form-control" id="teacherSubject" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save Teacher</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modalElement);

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const form = document.getElementById('addTeacherForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('teacherName').value;
    const subject = document.getElementById('teacherSubject').value;

    if (name && subject) {
      const newTeacher = new Teacher(Date.now(), name, subject);
      const teachers = getTeachers();
      teachers.push(newTeacher);
      localStorage.setItem('teachers', JSON.stringify(teachers));
      displayTeachers();
      modal.hide();
    }
  });

  modalElement.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modalElement);
  });
  updateCounts()

}

export function editTeacher(id) {
  let teachers = getTeachers();
  const teacher = teachers.find(t => t.id === parseInt(id));

  if (!teacher) {
    console.error('Teacher with ID ' + id + ' not found.');
    return;
  }

  const newName = prompt('New Name of the Teacher:', teacher.name);
  const newSubject = prompt('New Subject of the Teacher:', teacher.subject);
  if (newName && newSubject) {
    teacher.name = newName;
    teacher.subject = newSubject;
    localStorage.setItem('teachers', JSON.stringify(teachers));
    displayTeachers();
    updateCounts()

  }
}

export function deleteTeacher(id) {
  let teachers = getTeachers();
  teachers = teachers.filter(teacher => teacher.id !== parseInt(id));
  localStorage.setItem('teachers', JSON.stringify(teachers));
  displayTeachers();
  updateCounts()

}
