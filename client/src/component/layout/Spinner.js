
import React, { Fragment } from 'react'
import spinner from './giphy.gif';

const Spinner = () => <div style={{
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: '0',
   left: '0',
   bottom: '0',
   right: '0',
   zIndex: '100',
   opacity: '0.7',
   backgroundColor: '#fcfcfc'
}}>
   <img src={spinner} alt="Loading..." style={{
      width: '200px',
      margin: 'auto',
      display: 'block', position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
   }} />
</div>

export default Spinner