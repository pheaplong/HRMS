import React,{useEffect,useState} from 'react'
import Spinner from '../layout/Spinner'
import Axios from 'axios'
import DepartmentContext from '../../context/department/DepartmentContext';
const Home = () => {
   const [state, setState] = useState([])

   return (
      <div>
         <Spinner/>
         <h1>Home</h1>
   {/* <p>{state[0].dep_name}</p> */}
      </div>
   ) 
}

export default Home
