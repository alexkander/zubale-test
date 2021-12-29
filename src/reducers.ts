import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

export interface AppState {
  records: any[];
  loaded: boolean;
  loading: boolean;
  error: any | null;
}

const initialState: AppState = {
  records: [],
  loaded: false,
  loading: false,
  error: '',
};

export const LOAD_RECORDS_START = 'LOAD_RECORDS_START';
export const LOAD_RECORDS_DONE = 'LOAD_RECORDS_DONE';
export const LOAD_RECORDS_ERR = 'LOAD_RECORDS_ERR';

export interface LoadRecordsStartAction {
  type: typeof LOAD_RECORDS_START;
}

export interface LoadRecordsDoneAction {
  type: typeof LOAD_RECORDS_DONE;
  payload: any[];
}

export interface LoadRecordsErrAction {
  type: typeof LOAD_RECORDS_ERR;
  payload: any;
}

export type AppAction =
  | LoadRecordsDoneAction
  | LoadRecordsErrAction
  | LoadRecordsStartAction;

export function loadRecordsStart(): LoadRecordsStartAction {
  return {
    type: LOAD_RECORDS_START,
  };
}

export function loadRecordsDone(records: any[]): LoadRecordsDoneAction {
  return {
    type: LOAD_RECORDS_DONE,
    payload: records,
  };
}

export function loadRecordsErr(err: any): LoadRecordsErrAction {
  return {
    type: LOAD_RECORDS_ERR,
    payload: err,
  };
}

export const getRecords = () => async (dispatch: any) => {
  dispatch(loadRecordsStart());

  try {
    const res = await axios.get('https://retoolapi.dev/RMaZUj/data');
    dispatch(loadRecordsDone(res.data as any[]));
  } catch (e) {
    dispatch(loadRecordsErr(e));
  }
};

export function recordsReducer(
  state = initialState,
  action: AppAction,
): AppState {
  if (action.type === LOAD_RECORDS_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === LOAD_RECORDS_DONE) {
    return {
      ...state,
      loading: false,
      loaded: true,
      records: action.payload,
      error: null,
    };
  }
  if (action.type === LOAD_RECORDS_ERR) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }
  return state;
}

const store = createStore(
  recordsReducer,
  initialState,
  applyMiddleware(thunkMiddleware),
);

export default store;
