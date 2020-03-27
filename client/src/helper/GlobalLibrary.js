class GlobalLibrary{
   checkIfNull(...args){
      for (let index = 0; index < args.length; index++) {
         if(!args[index])
               return true
         
      }
         return false
      } 
}
module.exports = GlobalLibrary