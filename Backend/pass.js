import bcrypt from 'bcrypt';
const saltRounds = 10;

bcrypt.hash('@Issa0406sog', saltRounds, function(err, hash) {
  console.log(hash);});
