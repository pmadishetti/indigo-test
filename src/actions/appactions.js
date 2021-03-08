import Actions from './actionTypes';
import axios from 'axios';

export const loadImages = async (dispatch, data) => {
    try {
        loaderStatus(dispatch, true);
        const response = await axios.get('http://localhost:4000/images');
        if (response && response.data.code === 200) {
            dispatch({ type: Actions.images, value: response.data.data.photos });
            loaderStatus(dispatch, false);
        }
        else {
            loaderStatus(dispatch, false);
            dataSuccess(dispatch, false);
        }
    }
    catch(e){
        console.log(e);
        loaderStatus(dispatch, false);
        dataSuccess(dispatch, false);
    }
}
export const loaderStatus = (dispatch, data) => {
    dispatch({ type: Actions.loader, value: data });
}
export const dataSuccess = (dispatch, data) => {
    dispatch({ type: Actions.dataSuccess, value: data });
}
export const enableNavigate = (dispatch) => {
    dispatch({ type: Actions.enableNavigate });
}