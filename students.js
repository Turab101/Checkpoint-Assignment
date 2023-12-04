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

export function addStudent()  {
  const name = prompt('Name of the Student:');
  const grade = prompt('Mark of the Student:');
  if (name && grade) {
    const newStudent = new Student(Date.now(), name, parseFloat(grade));
    const students = getStudents();
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }
}

export function editStudent(id) {
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


export function deleteStudent(id) {
  let students = getStudents();
  students = students.filter(student => student.id !== parseInt(id));
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}









export function getStudents() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  return students.map(student => new Student(student.id, student.name, student.grade));
}







 