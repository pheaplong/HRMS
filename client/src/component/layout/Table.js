import React from 'react'
import PropTypes from 'prop-types'


const Table = (props) => {
   const {columns,body}=props;

   return (
     
      <div>
         <table className="table table-hover">
            <thead>
               <tr>
                 {
                    columns.map((col,i)=>(<th key={i} scope="col">{col}</th>))
                 }
               </tr>
            </thead>
            <tbody>
               {body}
            </tbody>
         </table>
      </div>
   )
}
Table.propTypes ={
   columns:PropTypes.array.isRequired,
   body:PropTypes.array.isRequired
}

export default Table
