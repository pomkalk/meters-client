import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as axios from 'axios'
import { Modal, message } from 'antd'

export const SET_ACCESS = 'SET_ACCESS'
export const SET_SAVED = 'SET_SAVED'
export const SET_STREETS = 'SET_STREETS'
export const SET_BUILDINGS = 'SET_BUILDINGS'
export const SET_APARTMENTS = 'SET_APARTMENTS'
export const SET_PENDING = 'SET_PENDING'
export const ADD_SAVED = 'ADD_SAVED'
export const REMOVE_SAVED = 'REMOVE_SAVED'
export const SET_EDIT = 'SET_EDIT'
export const SET_HISTORY = 'SET_HISTORY'
export const SET_CHANGE = 'SET_CHANGE'
export const UPDATE_METER = 'UPDATE_METER'

const serverRequestError = {
    title: 'Ошибка',
    content: 'Ошибка при запросе к серверу.'
}

const initState = {
    access: null,
    saved: null,
    streets: {
        data: null,
        loading: true
    },
    buildings: {
        data: null,
        loading: false
    },
    apartments: {
        data: null,
        loading: false
    },
    pending: false,
    edit: null,
    history: null,
    change: {
        visible: false
    }
}

const reducer = (state = initState, action) => {
    let meters, index
    switch (action.type) {
        case SET_ACCESS: return {...state, access: action.data}
        case SET_SAVED: return {...state, saved: action.data}
        case SET_EDIT: return {...state, edit: action.data}
        case SET_CHANGE: return {...state, change: action.data}
        case SET_HISTORY: return {...state, history: action.data}
        case SET_PENDING: return {...state, pending: action.data}
        case SET_STREETS: return {...state, streets: { data: action.data, loading: action.loading }}
        case SET_BUILDINGS: return {...state, buildings: { data: action.data, loading: action.loading }}
        case SET_APARTMENTS: return {...state, apartments: { data: action.data, loading: action.loading }}
        case ADD_SAVED: 
            meters = state.saved || []
            if (meters.findIndex(x => x.address === action.data.address)>=0) {
                return state
            }
            meters.push(action.data)
            localStorage.setItem('svd', JSON.stringify(meters))
            return {...state, saved: meters}
        case REMOVE_SAVED: 
            meters = state.saved || []
            index = meters.findIndex(x => x.address === action.data)
            if (index>=0) {
                meters.splice(index, 1)
                if (meters.length === 0) {
                    localStorage.removeItem('svd')
                    return {...state, saved: null}
                }
                localStorage.setItem('svd', JSON.stringify(meters))
                return {...state, saved: meters}
            }
            return state
        case UPDATE_METER: return {...state, edit: {...state.edit, meters: state.edit.meters.map(x=> x.id===action.meter.id?action.meter:x ) }}
        default: return state
    }
}

export const setAccess = (data) => ({ type: SET_ACCESS, data})
export const setSaved = (data) => ({ type: SET_SAVED, data})
export const setEdit = (data) => ({ type: SET_EDIT, data})
export const setChange = (data) => ({ type: SET_CHANGE, data})
export const updateMeter = (meter) => ({ type: UPDATE_METER, meter })
export const setHistory = (data) => ({ type: SET_HISTORY, data})
export const addSaved = (data) => ({ type: ADD_SAVED, data})
export const removeSaved = (data) => ({ type: REMOVE_SAVED, data})
export const setPending = (data) => ({ type: SET_PENDING, data})
export const setStreets = (data, loading=false) => ({ type: SET_STREETS, data, loading})
export const setBuildings = (data, loading=false) => ({ type: SET_BUILDINGS, data, loading})
export const setApartments = (data, loading=false) => ({ type: SET_APARTMENTS, data, loading})

export const getAccess = () => (dispatch) => {
    axios.get('/api/access').then(({data}) => {
        if (!data.access) {
            dispatch(setAccess(data.message))
        }
    })
}

export const getStreets = () => (dispatch) => {
    axios.get('/api/address').then(({data}) => {
        dispatch(setStreets(data))
    }).catch((err) => {
        Modal.error(serverRequestError)
    })
    
}

export const getBuildings = (street_id) => (dispatch) => {
    dispatch(setBuildings(null, true))
    dispatch(setApartments(null, false))
    axios.get('/api/address/s'+street_id).then(({data}) => {
        dispatch(setBuildings(data))
    }).catch((err) => {
        Modal.error(serverRequestError)
    })
}

export const getApartments = (building_id) => (dispatch) => {
    dispatch(setApartments(null, true))
    axios.get('/api/address/b'+building_id).then(({data}) => {
        dispatch(setApartments(data))
    }).catch((err) => {
        Modal.error(serverRequestError)
    })
}

export const getMeters = (token) => (dispatch) => {
    dispatch(setEdit({ loading: true }))
    axios.post('/api/get-meters', {token}).then(({data}) => {
        dispatch(setEdit({...data, token, loading: false}))
    }).catch((err) => {
        Modal.error(serverRequestError)
        dispatch(setEdit(null))
    })
}

export const getOpen = (params) => (dispatch, getState) => {
    dispatch(setPending(true))
    axios.post('/api/get-token', params).then(({data}) => {
        if (data.error) {
            Modal.error({
                title: 'Ошибка',
                content: data.error
            })
            return dispatch(setPending(false))
        }
        if (params.remember) {
            dispatch(addSaved(data))
        }
        dispatch(getMeters(data.token))
    }).catch((err) => {
        Modal.error(serverRequestError)
        dispatch(setPending(false))
    })
}

export const getHistory = (token, meter_id) => (dispatch) => {
    dispatch(setHistory({loading: true}))
    axios.post('/api/get-history', {token, meter_id}).then(({data})=>{
        dispatch(setHistory({...data, loading: false}))
    }).catch((err) => {
        Modal.error(serverRequestError)
        dispatch(setHistory(null))
    })
}

export const setMeter = (token, meter_id, value) => (dispatch) => {
    axios.post('/api/save', {token, meter_id, value}).then(({data}) => {
        if (data.error) {
            Modal.error({
                title: 'Ошибка',
                content: data.error
            })
        } else {
            dispatch(updateMeter(data.meter))
            message.success({
                content: 'Показания сохранены.',
                duration: 2,
                style: {
                    marginTop: '60px'
                }
            })
        }
    }).catch((err) => {
        Modal.error(serverRequestError)
    })
}

export const sendFeed = (token, text) => (dispatch) => {
    axios.post('/api/feedback', {token, text}).then(() => {
        message.success({
            content: 'Отзыв отправлен.',
            duration: 2,
            style: {
                marginTop: '60px'
            }
        })
    }).catch((err) => {
        Modal.error(serverRequestError)
    })
}

const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default store
