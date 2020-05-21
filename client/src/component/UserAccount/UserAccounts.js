import React, { useEffect, useContext, useState } from 'react'
import UserAccountContext from '../../context/UserAccount/UserAccountContext'
import Spinner from '../layout/Spinner'
import Table from '../layout/Table'
import GlobalLibrary from '../../helper/GlobalLibrary'
import $ from 'jquery'
import Axios from 'axios'
const UserAccounts = () => {
  const { loadUserAccount, userPermissions, userAccounts, loading, current, loadAllPermissionByUserID, setCurrent } = useContext(UserAccountContext)
  const columns = ['No', 'ID', 'Name']
  const body = []
  const columnPermission = ['No', 'Action ID', 'Action Name', 'Module Name']
  const [permissions, setPermissions] = useState([])
  const row_onClick = (userAccount) => {
    loadAllPermissionByUserID(userAccount.USER_ID)
    setCurrent(userAccount)
  }
  useEffect(() => {
    let script
    (async () => {
      loadUserAccount()
      if (current) {
        const gl = new GlobalLibrary()
        const res = await Axios.get('/api/useraccount/' + current.USER_ID)
        // data:"${JSON.stringify({ oringinPermission: res.data.forTree })}",
        const sql = `
        $(document).ready(function(){
            $("#userPermissionTree").jstree({ "core" : { "data" : ${JSON.stringify(res.data.forTree)}},"plugins":["checkbox"]   }); 
            $("#btnSavePermission").click(function(e){
               e.preventDefault();
               $.ajax({
                  type: 'POST',
                  async:false,
                  dataType:'json',
                  data:JSON.stringify( { USER_ID:${current.USER_ID},originPermission: ${JSON.stringify(res.data.forTree)}, newPermission: $('#userPermissionTree').jstree(true).get_selected()}),
                  contentType: 'application/json',
                  url: 'http://localhost:5000/api/useraccount/permission',
                  success: function (res) {
                     if(res.isSuccessed)
                     console.log('success')
                     else{
                     console.log(res.message)
                     }
                   window.location.reload(false); 
                  },
                  error:function(e){
                     alert(e)
                  }
               });
            })
         })
        `
        $('.permission-right').append('<div id=userPermissionTree><div>')
        script = gl.LoadScriptByText(sql)
        // gl.LoadScriptByText(sql)
      }
    })()
    return () => {
      // $('.permission-right').empty()
      if (script) {
        script.innerHTML=""
        document.body.removeChild(script)
        $('#userPermissionTree').remove()
      }
    }
  }, [current])
  return (
    <div id="permisson-wrapper">
      {
        loading && <Spinner />
      }
      {
        userAccounts.map((u, i) => {
          body.push(
            <tr onClick={() => { row_onClick(u) }}>
              <td>{i + 1}</td>
              <td>{u.USER_ID}</td>
              <td>{u.FULL_NAME}</td>
            </tr>)
        })

      }
      <div className="permission-left" >
        <Table columns={columns} body={body} />
      </div>
      <div className="permission-right">
        <button className="btn-primary btn-md" id='btnSavePermission' >Save</button>
      </div>
    </div >

  )
}

export default UserAccounts
