import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	tasks : Task[];
	title	:	string;
  	constructor(private taskService:TaskService) {

  		this.taskService.getTasks()
  			.subscribe(tasks=>{
  				console.log(tasks);
  				this.tasks	=	tasks;

			})
   	}

  	ngOnInit() {

  	}
  	 addTask(event){

  	 	event.preventDefault();
  	 	console.log(this.title);
  	 	let newTask ={
  	 		title:this.title,
  	 		isDone:false
  	 	}

  	 	this.taskService.addTask(newTask)
  	 		.subscribe(task=>{
  	 			this.tasks.push(task);
  	 			this.title='';
  	 		})
  	 }

  	 deleteTask(id){

 		let tasks	=	this.tasks;
 		console.log(tasks);
 		this.taskService.deleteTask(id)
 			.subscribe(data =>{
 				console.log(tasks);
 				if(data.n === 1){
 					for(let i=0;i<tasks.length;i++){
 						//console.log(tasks + i);
 						if(tasks[i]._id === id){
 							tasks.splice(i,1);
 						}
					}
 				}
 			})
  	 	
  	 }

  	 updateStatus(task){

  	 	let _task	=	{
  	 		
  	 		_id:task._id,
  	 		title:task.title,
  	 		isDone:!task.isDone
  	 	}
  	 	this.taskService.updateStatus(_task)
  	 		.subscribe(data =>	{
  	 			task.isDone	= !task.isDone;
  	 		})
  	 }

}
