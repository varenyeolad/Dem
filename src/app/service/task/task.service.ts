import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task, TaskState } from '../../type/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksStateKey = 'tasksState';

  public tasksState: TaskState = this.loadTasksStateFromLocalStorage();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private loadTasksStateFromLocalStorage(): TaskState {
    if (isPlatformBrowser(this.platformId)) {
      const tasksStateString = localStorage.getItem(this.tasksStateKey);
      try {
        return tasksStateString ? JSON.parse(tasksStateString) : { tasks: [] };
      } catch (error) {
        console.error('Error parsing tasks state from local storage:', error);
        return { tasks: [] }; // Return empty tasks state on error
      }
    } else {
      return { tasks: [] }; // Return empty tasks state on server-side
    }
  }

  private saveTasksStateToLocalStorage(tasksState: TaskState): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.tasksStateKey, JSON.stringify(tasksState));
      } catch (error) {
        console.error('Error saving tasks state to local storage:', error);
      }
    }
  }

  addTask(task: Task) {
    this.tasksState.tasks.push(task);
    this.saveTasksStateToLocalStorage(this.tasksState);
  }

  selectCurrentTask(task: Task) {
    this.tasksState.tasks.forEach((e) => {
      e.isSelected = (e === task);
    });
    this.saveTasksStateToLocalStorage(this.tasksState);
  }

  changeStatus(task: Task, status: 'pending' | 'done') {
    const foundTask = this.tasksState.tasks.find(e => e === task);
    if (foundTask) {
      foundTask.status = status;
      this.saveTasksStateToLocalStorage(this.tasksState);
    }
  }
  

  deleteTask(task: Task) {
    this.tasksState.tasks = this.tasksState.tasks.filter(e => e !== task);
    this.saveTasksStateToLocalStorage(this.tasksState);
  }

  incrementSessionUsedCounterOfCurrentTask() {
    const currentTask = this.tasksState.tasks.find(e => e.isSelected);
    if (currentTask) {
      currentTask.sessionsUsed++;
      this.saveTasksStateToLocalStorage(this.tasksState);
    }
  }
}
