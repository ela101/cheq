import VastService from '../services/VastService';

export const FETCH_VASTS_SUCCESS = 'FETCH_VASTS_SUCCESS';
export const FETCH_VASTS_FAIL = 'FETCH_VASTS_FAIL';
export const ADD_VAST_SUCCESS = 'ADD_VAST_SUCCESS';
export const ADD_VAST_FAIL = 'ADD_VAST_FAIL';
export const UPDATE_VAST_SUCCESS = 'UPDATE_VAST_SUCCESS';
export const UPDATE_VAST_FAIL = 'UPDATE_VAST_FAIL';
export const GET_VAST_BY_ID_SUCCESS = 'GET_VAST_BY_ID_SUCCESS';
export const GET_VAST_BY_ID_FAIL = 'GET_VAST_BY_ID_FAIL';

// Dispatched functions
const fetchVastsSuccess = data => (
  {
    type: FETCH_VASTS_SUCCESS,
    data,
  }
);


const fetchVastsFail = error => (
  {
    type: FETCH_VASTS_FAIL,
    error,
  }
);

const addVastSuccess = data => (
  {
    type: ADD_VAST_SUCCESS,
    data,
  }
);

const addVastFail = error => (
  {
    type: ADD_VAST_FAIL,
    error,
  }
);

const updateVastSuccess = data => (
  {
    type: UPDATE_VAST_SUCCESS,
    data,
  }
);

const updateVastFail = error => (
  {
    type: UPDATE_VAST_FAIL,
    error,
  }
);

const getVastByIdSuccess = data => (
  {
    type: GET_VAST_BY_ID_SUCCESS,
    data,
  }
);

const getVastByIdFail = error => (
  {
    type: GET_VAST_BY_ID_FAIL,
    error,
  }
);

// Async actions
export const fetchVastsAsync = () => dispatch => VastService.fetchVasts()
  .then(({ data }) => dispatch(fetchVastsSuccess(data.data)))
  .catch(error => dispatch(fetchVastsFail(error)));

export const addVastAsync = vast => dispatch => VastService.addVast(vast)
  .then(({ data }) => dispatch(addVastSuccess(data.data)))
  .catch(error => dispatch(addVastFail(error)));

export const updateVastAsync = vast => dispatch => VastService.updateVast(vast)
  .then(({ data }) => dispatch(updateVastSuccess(data.data)))
  .catch(error => dispatch(updateVastFail(error)));

export const getVastByIdAsync = id => dispatch => VastService.getVastById(id)
  .then(({ data }) => dispatch(getVastByIdSuccess(data.data)))
  .catch(error => dispatch(getVastByIdFail(error)));
