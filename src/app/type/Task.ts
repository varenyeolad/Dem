export interface Task {
	name: string,
	isSelected: boolean,
	sessionsUsed: number,
	sessionsNeeded: number,
	status: 'pending' | 'done'
}

export interface TaskState {
	tasks: Task[]
}
