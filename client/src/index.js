const bcrypt=require('bcryptjs');
const password='asd';
try {
   password=await bcrypt.hash(password,10);
   console.log(password);
   
} catch (error) {
  console.log(error);
   
}