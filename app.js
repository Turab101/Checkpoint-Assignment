
import { displayClasses, addClass, editClass, deleteClass, getClasses } from "./class.js";
import { displayTeachers, addTeacher, editTeacher, deleteTeacher, getTeachers } from "./teacher.js";
import { displayStudents, addStudent,editStudent, deleteStudent, getStudents } from "./students.js";
import { studentsData,teachersData,classesData } from "./data.js"



export function updateCounts() {
  const studentsCountElement = document.getElementById('students-count');
  const teachersCountElement = document.getElementById('teachers-count');
  const classesCountElement = document.getElementById('classes-count');

  const studentStaticCount = (studentsData.content.match(/<div class="col-md-4 mb-4">/g) || []).length;
  const teacherStaticCount = (teachersData.content.match(/<div class="col-md-4 mb-4">/g) || []).length;
  const classStaticCount = (classesData.content.match(/<div class="col-md-4 mb-4">/g) || []).length;

  const studentsFromLocalStorage = JSON.parse(localStorage.getItem('students')) || [];
  const teachersFromLocalStorage = JSON.parse(localStorage.getItem('teachers')) || [];
  const classesFromLocalStorage = JSON.parse(localStorage.getItem('classes')) || [];

  const totalStudentsCount = studentsFromLocalStorage.length + studentStaticCount;
  const totalTeachersCount = teachersFromLocalStorage.length + teacherStaticCount;
  const totalClassesCount = classesFromLocalStorage.length + classStaticCount;

  studentsCountElement.textContent = ` Number of students: ${totalStudentsCount}`;
  teachersCountElement.textContent = ` Number of teachers: ${totalTeachersCount}`;
  classesCountElement.textContent = ` Number of classes ${totalClassesCount}`;

  localStorage.setItem('totalStudentsCount', totalStudentsCount);
  localStorage.setItem('totalTeachersCount', totalTeachersCount);
  localStorage.setItem('totalClassesCount', totalClassesCount);
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

