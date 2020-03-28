import { SET_ALERT, REMOVE_ALERT } from '../type';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
         ...state,
         tittle: action.payload.tittle,
         message: action.payload.message,
         isSuccess:action.payload.isSuccess,
         visibility:'visible'};
    case REMOVE_ALERT:
      return  {
         ...state,
         tittle:'',
         message:'',
         isSuccess:false,
         visibility:'hidden'};
    default:
      return state;
  }
};
