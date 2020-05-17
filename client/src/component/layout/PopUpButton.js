/* eslint-disable*/
import {createContext} from 'react';
import React from 'react'
import Popup from 'reactjs-popup'
class PopUpButton extends React.Component {
   constructor(props) {
      super(props);
      this.state = { open: false };
      this.DoubleClick = this.openModal.bind(this);
      this.Click = this.openModal.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
   
    }
    openModal() {
      if(this.props.onDoubleClick!= null){  this.props.onDoubleClick()}
      if(this.props.onClick!= null && this.props.onDoubleClick== null){  this.props.onClick()}  
      this.setState({ open: true });  
      }
      closeModal() {
         this.props.onClosingModal && this.props.onClosingModal()
      this.setState({ open: false });
    }
    render(){
   const { className, text, component,trigger }=this.props;
      return (
         <div > 
            {
               !trigger ?( <button className={className} onClick={this.openModal}>{text}</button>) 
               : (<div  onDoubleClick={this.openModal} >{trigger}</div>)
            }
           
            <Popup 
             open={this.state.open}
             closeOnDocumentClick
             onClose={this.closeModal}
               modal position="top left"  >
                  <div>
                     <a className="close" onClick={this.closeModal}>
                        <i  className=" m-2 far fa-times-circle" style={{paddingBottom:'15px'}}></i>
                     </a>
                     <div>

                     {component} 
                     </div>
                  </div>
            </Popup>
         </div>
      )
   }
   
}

export default PopUpButton
