const PermissionProccess = require('../DomainProccessor/PermissionProccess')
class PermissionLogic {
  constructor() {
    this.permissionProccess = new PermissionProccess()
  }
  async isPermissionQualify(USER_ID, ACTION_ID) {
    const result = await this.permissionProccess.loadDataByID(USER_ID, ACTION_ID)
    if (!result.isSuccessed)
      return result
    if (result.result == 0 || result.result[0].STATUS_ID == 37)
      return { message: 'Permission Denied' }
    return result

  }
  async LoadAllPermissionByUser(USER_ID) {
    const result = await this.permissionProccess.loadAllDataByID(USER_ID)
    if (!result.isSuccessed) return result
    try {
      result.forTree = await this.generateForTree(result.result)
      return result
    } catch (e) {
      return e
    }
  }
  async LoadPermission() {
    const result = await this.permissionProccess.loadData()
    return result
  }
  async setPermission(USER_ID, tmpOrigin, tmpNewPermission) {
    const NewPermission = Array.from(tmpNewPermission, p => ({ id: p }))
    const permissions = this.getPermissionToBeInsert(USER_ID, tmpOrigin, NewPermission)
    const result = await this.permissionProccess.insertDataMany(permissions)
    return result
  }
  //#region PRIVATE METHOD 
  getPermissionToBeInsert(USER_ID, tmpOrigin, tmpNewPermission) {
    // CLEAN ARRAY
    const origin = tmpOrigin.map(p => ({
      USER_ID: USER_ID,
      ACTION_ID: p.id,
    }))
    const newPermission = tmpNewPermission.map(p => ({
      USER_ID: USER_ID,
      ACTION_ID: p.id,
    }))
    //
    const enablePermission = newPermission.filter((p) => !origin.some(o => o.ACTION_ID === p.ACTION_ID))
      .map(p => ({
        ...p,
        STATUS_ID: 36
      }))
    const disablePermission = origin.filter(o => !newPermission.some(p => p.ACTION_ID === o.ACTION_ID))
      .map(p => ({
        ...p,
        STATUS_ID: 37
      }))
    return [...enablePermission, ...disablePermission]
  }
  async generateForTree(data) {
    const modules = await this.permissionProccess.loadModule();
    if (!modules.isSuccessed) throw modules
    let newData = Array.from(data, d => {
      d.state = { selected: d.selected ? true : false }
      delete d.selected
      return d
    })
    let newModules = Array.from(modules.result, m => {
      return {
        id: m.MOD_ID,
        text: m.MOD_NAME,
        parent: m.MOD_PARENT == null ? '#' : m.MOD_PARENT
      }
    })
    return newModules.concat(newData)
  }
  //#endregion
}
module.exports = PermissionLogic