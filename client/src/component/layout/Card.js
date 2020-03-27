import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ header, tittle, content, id }) => {
   return (
      <div className="card">
         <div className="card-header">
            {header}
         </div>
         <div className="card-body">
            <h5 className="card-title">{tittle}</h5>
            <p className="card-text">{content}</p>
            <Link to={`/department/${id}`} className="btn btn-primary">Details</Link>
            
         </div>
      </div>
   )
}

export default Card
