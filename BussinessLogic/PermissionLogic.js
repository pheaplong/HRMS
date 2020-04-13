const PermissionProccess = require('../DomainProccessor/PermissionProccess')
class PermissionLogic {
   constructor() {
      this.permissionProccess = new PermissionProccess()
   }
   async isPermissionQualify(USER_ID, ACTION_ID) {
      const result = await this.permissionProccess.loadDataByID(USER_ID, ACTION_ID)
      if (!result.isSuccessed)
         return result
      if (!result.result[0].STATUS_ID == 37)
         return { message: 'Permission Denied' }
      return result

   }
}
module.exports = PermissionLogic