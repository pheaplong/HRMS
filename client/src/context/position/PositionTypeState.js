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
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: LOAD_POSITION_TYPE, payload: res.data.result });
        
      } catch (error) {
         setAlert(error.message)
      }

   }
   const loadPositionTypeByFilter = async (DEP_ID) => {
         try {
            setLoading();
            const res = await Axios.get('/api/PositionType')
            clearLoading();
            if (!res.data.isSuccessed) {
               setAlert(res.data.message)
               return;
            }
            const data=res.data.result.filter(p=>p.DEP_ID==DEP_ID)
            dispatch({ type: FILTER_POSITION_TYPE, payload:data });
           
         } catch (error) {
            setAlert(error.message)
         }
   

   }
   //ADD_PositionType
   const addPositionType = async PositionType => {
      try {
         setLoading();
         const res = await Axios.post('/api/PositionType/add', PositionType)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         PositionType.POS_ID = res.data.LAST_INSERT_ID;
         dispatch({ type: ADD_POSITION_TYPE, payload: PositionType });
         setAlert('Transaction Successfully',true)
      } catch (error) {
         setAlert(error.message)
         
      }
   }
   //UPDATE
   const updatePositionType = async PositionType => {
      try {
         setLoading();
         const res = await Axios.put('/api/PositionType/update', PositionType)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: UPDATE_POSITION_TYPE, payload: PositionType });
         setAlert('Transaction Successfully',true)
      } catch (error) {
         setAlert(error.message)
         clearLoading()
      }
   }
   //DELETE
   const deletePositionType = async PositionType => {
      
      try {
         setLoading();
         const res = await Axios.delete('/api/PositionType/delete',{
            data:PositionType
         } )
         // const res = await Axios.delete('/api/PositionType/delete',PositionType )
        // window.alert(JSON.stringify(PositionType))
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: DELETE_POSITION_TYPE, payload: PositionType });
         setAlert('Transaction Successfully',true)
      } catch (error) {
         setAlert(error.message)
         clearLoading()
      }
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

