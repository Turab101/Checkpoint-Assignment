import {updateCounts} from "./app.js";
import { classesData } from './data.js';
 


 class Class {
    constructor(id, name, teacherId) {
      this.id = id;
      this.name = name;
      this.teacherId = teacherId;
    }
  }
  


  export function getClasses() {
    return JSON.parse(localStorage.getItem('classes') || '[]');
  }
  



  export function displayClasses() {
    const classes = getClasses();
    const contentDiv = document.getElementById('main-content');
    contentDiv.innerHTML = `
      <h1 class="text-center my-4">Class Management</h1>
      <div class="row" id="class-list">
      ${classesData.content}
        ${classes.map(cls => `
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Name: ${cls.name}</h5>
                <p class="card-text">Teacher-ID: ${cls.teacherId}</p>
                <button class="edit-class-btn btn btn-info" data-id="${cls.id}">Edit</button>
                <button class="delete-class-btn btn btn-danger" data-id="${cls.id}">Delete</button>
              </div>
            </div>
          </div>`).join('')}
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button id="add-class-btn" class="btn btn-primary">Add Class</button>
      </div>`;
  
    document.getElementById('add-class-btn').addEventListener('click', addClass);
    document.querySelectorAll('.edit-class-btn').forEach(btn => {
      btn.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        editClass(id);
      });
    });
    document.querySelectorAll('.delete-class-btn').forEach(btn => {
      btn.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        deleteClass(id);
      });
    });
  }
  



  export function addClass() 
   {
        const modalElement = document.createElement('div');
        modalElement.id = 'addClassModal';
        modalElement.className = 'modal fade';
        modalElement.tabIndex = '-1';
        modalElement.role = 'dialog';
        modalElement.setAttribute('aria-labelledby', 'addClassModalLabel');
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.innerHTML = `
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addClassModalLabel">Add New Class</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="addClassForm">
                  <div class="form-group">
                    <label for="className">Class Name</label>
                    <input type="text" class="form-control" id="className" required>
                  </div>
                  <div class="form-group">
                    <label for="teacherId">Teacher ID</label>
                    <input type="number" class="form-control" id="teacherId" required>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save Class</button>
                  </div>
                </form>
              </div>
            </div>
          </div>`;
      
        document.body.appendChild(modalElement);
      
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      
        const form = document.getElementById('addClassForm');
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          const name = document.getElementById('className').value;
          const teacherId = document.getElementById('teacherId').value;
      
          if (name && teacherId) {
            const newClass = new Class(Date.now(), name, parseInt(teacherId));
            const classes = getClasses();
            classes.push(newClass);
            localStorage.setItem('classes', JSON.stringify(classes));
            displayClasses();
            modal.hide();
          }
        });
      
        modalElement.addEventListener('hidden.bs.modal', function () {
          document.body.removeChild(modalElement);
        });
        
        updateCounts()

      }
  

  
  export function editClass(id) {
    let classes = getClasses(); 
    const cls = classes.find(c => c.id === parseInt(id));
    
    if (!cls) {
      console.error('Class with ID ' + id + ' not found.');
      return;  
    }
  
    const newName = prompt('New Name:', cls.name);
    const newTeacherId = prompt('New Teacher ID:', cls.teacherId);
    if (newName !== null && newTeacherId !== null) {
      cls.name = newName;
      cls.teacherId = parseInt(newTeacherId);
      localStorage.setItem('classes', JSON.stringify(classes));
      displayClasses();
      updateCounts()

    }
  }
  


  export function deleteClass(id) {
    let classes = getClasses();
    const updatedClasses = classes.filter(cls => cls.id !== parseInt(id));
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    displayClasses();
    updateCounts()

  }
  