import { Component, OnInit } from '@angular/core';

export class TodoList {
  description: string | undefined;
  priority!: TodoPriority;
  dueDate!: Date;

  constructor(data?: TodoList){
    if(data){
      this.description = data.description;
      this.priority = data.priority;
      this.dueDate = data.dueDate;
    }
  }
}

export enum TodoPriority{
  Low = 1,
  Medium,
  Important,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  todoList: TodoList[] = [];
  visible: boolean = false;
  filter: string = '';
  visibleList: TodoList[] = [];

  constructor(){

  }
  
  ngOnInit(): void {
    //Call here the 'endpoint' to get the information for the todo list
  }

  showDialog() {
    this.visible = true;
  }

  onSave(event: any){
    this.todoList?.push(event);
    this.visibleList?.push(event);
    this.visible = false;
  }

  onClose(event: any){
    this.visible = false;
  }

  getPriorityText(priority: TodoPriority){
    if (priority == TodoPriority.Important){
      return 'Important';
    } else if(priority == TodoPriority.Low){
      return 'Low';
    } else if (priority == TodoPriority.Medium) {
      return 'Medium';
    }

    return '';
  }

  search(){
    if(this.filter === ''){
      this.visibleList = this.todoList;
      return;
    }

    this.visibleList = [];
    this.todoList?.forEach(x => {
      if(x.description?.includes(this.filter)){
        this.visibleList.push(x);
      }
    });
  }
}
