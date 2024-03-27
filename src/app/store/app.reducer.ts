import {ActionReducerMap} from "@ngrx/store";

import * as auth from '../auth/store/auth.reducer'


export interface AppState {
    auth: auth.AuthState,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
}
