const PermissionLogic = require('../BussinessLogic/PermissionLogic')
const permissionLogic = new PermissionLogic()
describe('Permission', () => {
   test('should be PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.isSuccessed).toBe(true)
   })
   test('should be PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.isSuccessed).toBe(true)
   })
   test('should be PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.isSuccessed).toBe(true)
   }
   )
   test('Message should contain Cannot Connect to Database', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.message).toMatch(/to Database/)
      console.log(result.message);

   })
}
)
