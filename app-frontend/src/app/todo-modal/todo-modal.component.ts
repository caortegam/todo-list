import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TodoList, TodoPriority } from '../app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  todo: FormGroup;
  selectedDate: Date = new Date();

  constructor(){
    this.todo = new FormGroup({
      dueDate: new FormControl(new Date(), [
        Validators.required,
      ]),
      description: new FormControl('',  [
        Validators.required,
      ]),
      priority: new FormControl(undefined, [
        Validators.required,
      ]),
    });
  }

  get dueDate(){
    return this.todo.get('dueDate'); 
  }

  get description(){
    return this.todo.get('description');
  }

  get priority(){
    return this.todo.get('priority');
  }
  
  ngOnInit(): void {
    this.reset();    
  }

  save(){
    const result = new TodoList();
    result.description = this.description?.value;
    result.priority = this.priority?.value;
    result.dueDate = this.selectedDate;
    
    this.modalSave.emit(result);
    this.close();
  }

  close(){
    this.reset();
    this.modalClose.emit();
  }

  reset(){
    this.todo.reset();
    this.selectedDate = new Date();
  }
}
