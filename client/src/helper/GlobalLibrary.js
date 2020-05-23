import axios from 'axios';
import jwt from 'jsonwebtoken'
import Axios from 'axios';
class GlobalLibrary {
  checkIfNull(...args) {
    for (let index = 0; index < args.length; index++) {
      if (!args[index])
        return true

    }
    return false
  }
  embeddedPermission(ACTION_ID) {
    axios.defaults.headers.common['USER_ID'] = this.destructToken().user.USER_ID
    axios.defaults.headers.common['ACTION_ID'] = ACTION_ID
    setTimeout(() => {
      axios.defaults.headers.common['ACTION_ID'] = ''
    }, 500);
  }
  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['auth-token'];
    }
  };
  destructToken() {
    try {

      return jwt.verify(localStorage.getItem('token'), 'i am handsome')
    } catch  {
      return null
    }
  }
  async uploadFile(file) {
    if (!file.has('file'))
      return true
    try {
      const res = await Axios.post('/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data.isSuccessed ? true : false
    } catch (error) {
      return false;
    }
  }
  LoadScriptByText(text) {
    const script = document.createElement('script');
    script.innerHTML = text
    script.async = false;
    document.body.appendChild(script);
    return script
  }
  LoadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    document.body.appendChild(script);
  }
}
export default GlobalLibrary