export class Student {
  constructor(id, name, grade) {
    this.id = id;
    this.name = name;
    this.grade = grade;
  }
}






export function displayStudents() {
  const students = getStudents();
  const contentDiv = document.getElementById('main-content');
  contentDiv.innerHTML = `<h1>Stundetsmanagment</h1>
                          <button id="add-student-btn">add Student</button>
                          <div id="student-list">${students.map(student =>
                            `<div class="student-card">
                              <div>Name: ${student.name}</div>
                              <div>Note: ${student.grade}</div>
                              <button class="edit-student-btn" data-id="${student.id}">edit</button>
                              <button class="delete-student-btn" data-id="${student.id}">delete</button>
                            </div>`).join('')}
                          </div>`;

  document.getElementById('add-student-btn').addEventListener('click', addStudent);
  document.querySelectorAll('.edit-student-btn').forEach(btn => {
    btn.addEventListener('click', () => editStudent(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.delete-student-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteStudent(btn.getAttribute('data-id')));
  });
}

export function addStudent() {
  const existingModal = document.getElementById('addStudentModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalElement = document.createElement('div');
  modalElement.id = 'addStudentModal';
  modalElement.className = 'modal fade';
  modalElement.tabIndex = '-1';
  modalElement.setAttribute('role', 'dialog');
  modalElement.setAttribute('aria-labelledby', 'addStudentModalLabel');
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addStudentModalLabel">Add New Student</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="addStudentForm">
            <div class="form-group">
              <label for="studentName">Name</label>
              <input type="text" class="form-control" id="studentName" required>
            </div>
            <div class="form-group">
              <label for="studentGrade">Grade</label>
              <input type="text" class="form-control" id="studentGrade" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save Student</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modalElement);

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const form = document.getElementById('addStudentForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value;
    const grade = document.getElementById('studentGrade').value;

    if (name && grade) {
      const newStudent = new Student(Date.now(), name, parseFloat(grade));
      const students = getStudents();
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));
      displayStudents();
      modal.hide();
    }
  });

  modalElement.addEventListener('hidden.bs.modal', function () {
    document.body.removeChild(modalElement);
  });
  updateCounts()

}



export function editStudent(id)  {
  let students = getStudents();
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    console.error(' Student with ' + id + ' not found.');
    return; 
  }

  const newName = prompt('New Name of Student:', student.name);
  const newGrade = prompt('New Mark new Student:', student.grade);
  if (newName && newGrade) {
    student.name = newName;
    student.grade = newGrade;
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }
}


export function deleteStudent(id)  {
  let students = getStudents();
  students = students.filter(student => student.id !== parseInt(id));
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}









export function getStudents()  {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  return students.map(student => new Student(student.id, student.name, student.grade));
}


  




 
