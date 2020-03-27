 const formatDate=date=>{
   let mydate=new Date(date)
   return mydate.toISOString().split('T')[0].split('-').reverse().join('-')
}
exports.formatDate=formatDate