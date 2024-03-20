export type State = 'start' | 'stop';

export type Type = 'session' | 'break';

export interface TimerState {
	sessionMinute : number,
    sessionSecond : number,
    breakMinute : number,
    breakSecond : number,
    state : State,
    type : Type
    sessionCounter: number
}