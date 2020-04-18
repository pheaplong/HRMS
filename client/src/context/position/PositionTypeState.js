import { useReducer, useContext } from 'react'
import PositionTypeContext from './PositionTypeContext';
import PositionTypeReducer from './PositionTypeReducer';
import alertContext from '../alert/alertContext'
import React from 'react'
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
import Axios from 'axios'

const PositionTypeState = (props) => {
   const initialState = {
      loading: false,
      PositionType: {},
      PositionTypes: [],
      current:null
   };
   const [state, dispatch] = useReducer(PositionTypeReducer, initialState);
   const {setAlert} = useContext(alertContext)
   //LOAD_PositionType
   const loadPositionType = async () => {
      try {
         setLoading();
         const res = await Axios.get('/api/PositionType')
         if (!res.data.isSuccessed) {
            setAlert('Position','Loading : '+res.data)
            return;
         }
         dispatch({ type: LOAD_POSITION_TYPE, payload: res.data.result });
         setAlert('Position','Loading : '+'Transaction Succesfully',true)
         
      } catch (error) {
         setAlert('Position','Loading : '+error.message)
      }
      clearLoading();

   }
   const loadPositionTypeByFilter = async (DEP_ID) => {
         try {
            setLoading();
            const res = await Axios.get('/api/PositionType')
            if (!res.data.isSuccessed) {
               throw res.data
            }
            const data=res.data.result.filter(p=>p.DEP_ID==DEP_ID)
            dispatch({ type: FILTER_POSITION_TYPE, payload:data });
            setAlert('Position','Loading : '+'Transaction Succesfully',true)
            
         } catch (error) {
            setAlert('Position','Loading : '+error.message)
         }
         clearLoading();
         
         
      }
   //ADD_PositionType
   const addPositionType = async PositionType => {
      try {
         setLoading();
         const res = await Axios.post('/api/PositionType/add', PositionType)
         if (!res.data.isSuccessed) {
         throw res.data
         }
         PositionType.POS_ID = res.data.LAST_INSERT_ID;
         dispatch({ type: ADD_POSITION_TYPE, payload: PositionType });
         setAlert('Position','Add : '+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Position','Add : '+error.message)
         
      }
      clearLoading()
   }
   //UPDATE
   const updatePositionType = async PositionType => {
      try {
         setLoading();
         const res = await Axios.put('/api/PositionType/update', PositionType)
         if (!res.data.isSuccessed) {
           throw res.data;
         }
         dispatch({ type: UPDATE_POSITION_TYPE, payload: PositionType });
         setAlert('Position','Upate: '+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Position','Upate: '+error.message)
         clearLoading()
         return;
      }
      clearLoading()
   }
   //DELETE
   const deletePositionType = async PositionType => {
      
      try {
         setLoading();
         const res = await Axios.delete('/api/PositionType/delete',{
            data:PositionType
         } )
        if (!res.data.isSuccessed) {
          throw res.data;
         }
         dispatch({ type: DELETE_POSITION_TYPE, payload: PositionType });
         setAlert('Position','Delete: '+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Position','Delete: '+error.message)
         clearLoading()
         return;
      }
      clearLoading()
   }
   const setLoading=()=>{
      dispatch({type:SET_LOADING});
   }
   const clearLoading=()=>{
      dispatch({type:CLEAR_LOADING});
   }
   const setCurrent= PositionType=>{
      dispatch({type:SET_CURRENT_POSITION_TYPE,payload:PositionType});
   }
   const clearCurrent=()=>{
      dispatch({type:CLEAR_CURRENT_POSITION_TYPE});
   }
   return (
      <PositionTypeContext.Provider value={{
         PositionTypes: state.PositionTypes,
         PositionType: state.PositionType,
         loading:state.loading,
         loadPositionType,
         loadPositionTypeByFilter,
         addPositionType,
         updatePositionType,
         deletePositionType,
         current:state.current,
         setCurrent,
         clearCurrent
      }}>

         {props.children}
      </PositionTypeContext.Provider>
   )
}

export default PositionTypeState

