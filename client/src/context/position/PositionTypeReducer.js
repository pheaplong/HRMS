import {
   LOAD_POSITION_TYPE,
   FILTER_POSITION_TYPE,
   ADD_POSITION_TYPE,
   UPDATE_POSITION_TYPE,
   DELETE_POSITION_TYPE,
   SET_LOADING,
   CLEAR_LOADING,
   SET_CURRENT_POSITION_TYPE,
   CLEAR_CURRENT_POSITION_TYPE,
   ERROR
} from '../type'
const PositionTypeReducer = (state, action) => {
   switch (action.type) {
      case LOAD_POSITION_TYPE:
         return {
            ...state,
            PositionTypes: action.payload,
            loading: false
         }
         break;
      case FILTER_POSITION_TYPE:


         return {
            ...state,
            PositionTypes: action.payload,
            loading: false
         }
         break;

      case ADD_POSITION_TYPE:

         return {
            ...state,
            PositionTypes: [action.payload, ...state.PositionTypes]
         }
         break;
      case UPDATE_POSITION_TYPE:

         return {
            ...state
            ,
            PositionTypes: state.PositionTypes.map(
               p => p.POS_ID === action.payload.POS_ID ? action.payload : p)
         }
         break;

      case SET_LOADING:
         return {
            ...state,
            loading: true
         }
         break;
      case CLEAR_LOADING:
         return {
            ...state,
            loading: false
         }
         break;
      case SET_CURRENT_POSITION_TYPE:
         return {
            ...state,
            current: action.payload
         }
         break;
      case CLEAR_CURRENT_POSITION_TYPE:
         return {
            ...state,
            current: null
         }
         break;
      case ERROR:
         return {
            ...state,
            loading: false,
            mwssage: 'erroraaaaaaaaaaaaaaaaa'
         }
         break;
      case DELETE_POSITION_TYPE:

         return {
            ...state,
            PositionTypes: state.PositionTypes.filter(p => p.POS_ID !== action.payload.POS_ID)
         }
         break;
      default:
         return {
            ...state
         }
         break;
   }
}
export default PositionTypeReducer;