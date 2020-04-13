const PermissionLogic = require('../DomainProccessor/PermissionProccess')
const permissionLogic = new PermissionLogic()
test('should be more than 0', async () => {
   let result = null
   result = await permissionLogic.loadDataByID(47, 1)
   expect(result.isSuccessed).toBe(true)

   result = await permissionLogic.loadDataByID(47, 1)
   expect(result.isSuccessed).toBe(true)
   result = await permissionLogic.loadDataByID(47, 1)
   expect(result.isSuccessed).toBe(true)
   result = await permissionLogic.loadDataByID(47, 1)
   expect(result.isSuccessed).toBe(true)
   result = await permissionLogic.loadDataByID(47, 1)
   expect(result.isSuccessed).toBe(true)

}
)
