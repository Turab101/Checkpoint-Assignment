
import { displayClasses, addClass, editClass, deleteClass, getClasses } from "./class.js";
import { displayTeachers, addTeacher, editTeacher, deleteTeacher, getTeachers } from "./teacher.js";
import { displayStudents, addStudent,editStudent, deleteStudent, getStudents } from "./students.js";





export function updateCounts() {
    const studentsCount = document.getElementById('students-count');
    const teachersCount = document.getElementById('teachers-count');
    const classesCount = document.getElementById('classes-count');
  
    studentsCount.textContent = `Number of students: ${getStudents().length}`;
    teachersCount.textContent = `Number of teachers: ${getTeachers().length}`;
    classesCount.textContent = `Number of classes: ${getClasses().length}`;
  }
  
  
window.onload = function() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPageContent(page);
        });
    });
}

function loadPageContent(page) {
    const mainContent = document.getElementById('main-content');

    switch(page) {
        case 'home':
            mainContent.innerHTML =  `<div class="list-container">
            <div id="students-count" class="list">
              <h3>Students</h3>
              <p>Number of students: 0</p>
            </div>
            <div id="teachers-count" class="list">
              <h3>Teachers</h3>
              <p>Number of teachers: 0</p>
            </div>
            <div id="classes-count" class="list">
              <h3>Classes</h3>
              <p>Number of classes: 0</p>
            </div>
          </div>`;
          updateCounts()
            break;
        case 'classes':
            displayClasses();
            break;
        case 'teachers':
            displayTeachers();
            break;
        case 'students':
            displayStudents();
            break;
        default:
            mainContent.innerHTML = '<h1>Welcome to Home Page</h1>';
                }
}



    addClass();
    editClass();
    deleteClass();

    addTeacher();
    editTeacher();
    deleteTeacher();

    addStudent();
    editStudent();
    deleteStudent();
    getClasses()
    getStudents()
    getTeachers()

