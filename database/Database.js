const oracledb = require('oracledb');
const config = require('config')
const conObj = config.get('conObj')
class Database {

  async connect() {
    let con = null;
    try {
      con = await oracledb.getConnection(conObj)
      return con;
    } catch (error) {
      throw new Error('Cannot Connect to Database... \n' + error.message)
    }
  }
  //LOAD
  async load(
    sql,
    params = [],
    mapper = null
  ) {
    let con = null;
    let result = [];
    let isSuccessed;
    let message;
    try {
      con = await this.connect();
      // if(!con)
      //    return;
      const temp = await con.execute(sql, params, {
        outFormat: oracledb.OBJECT

      });
      temp.rows.forEach(data => {
        mapper != null && mapper(data)
        result.push(data);
      })
      isSuccessed = true;
    } catch (error) {
      isSuccessed = false;
      message = error.message;
    } finally {
      if (con != null) {
        con.close();
        con = null;
      }
    }
    return {
      isSuccessed: isSuccessed,
      message: message,
      result: result
    }
  }
  //INSERT
  async insert(sql, params = {}) {
    let con = null;
    let result = [];
    let isSuccessed;
    let message;
    let LAST_INSERT_ID;
    try {
      con = await this.connect();
      // if(!con)
      //    return;

      const temp = await con.execute(sql, params, {
        autoCommit: true
      });
      isSuccessed = true;

      if (params.out) {
        LAST_INSERT_ID = temp.outBinds.out[0]
      }

    } catch (error) {
      isSuccessed = false;
      message = error.message;

    } finally {
      if (con != null) {
        con.close();
        con = null;
      }
    }
    return {
      isSuccessed: isSuccessed,
      message: message,
      result: result,
      LAST_INSERT_ID: LAST_INSERT_ID
    }
  }
  //INSERT_MANY
  async insertMany(sql, paramList = []) {
    let con = null;
    let result = [];
    let isSuccessed = false;
    let message;
    con = await this.connect();
    try {
      for (let i = 1; i <= paramList.length; i++) {
        if (i < paramList.length)
          oracledb.autoCommit = false
        else oracledb.autoCommit = true
        await con.execute(sql, paramList[i - 1])
      }
      isSuccessed = true
    } catch (error) {
      con.rollback();
      isSuccessed = false;
      message = error.message;

    } finally {
      if (con != null) {
        con.close();
        con = null;
      }
    }
    return {
      isSuccessed: isSuccessed,
      message: message,
      result: result
    }
  }

  //UPDATE OR DELETE
  async execute(sql, params = {}) {
    let con = null;
    let result = [];
    let isSuccessed;
    let message;
    try {
      con = await this.connect();
      // if(!con)
      //    return;
      const temp = await con.execute(sql, params, {
        autoCommit: true
      });
      isSuccessed = true;

    } catch (error) {
      isSuccessed = false;
      message = error.message;
    } finally {
      if (con != null) {
        con.close();
        con = null;
      }
    }
    return {
      isSuccessed: isSuccessed,
      message: message,
      result: result
    }
  }
}




module.exports = Database;