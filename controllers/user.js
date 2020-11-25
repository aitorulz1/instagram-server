const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Token
function createToken(user, SECRET_KEY, expiresIn){
  const { id, name, email, username } = user;
  const payload = {
    id,
    name,
    email,
    username
  };
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

// Register
async function register(input) {
    const newUser = input;
        
        newUser.email = newUser.email.toLowerCase();
        newUser.username = newUser.username.toLowerCase();
        
        // Destructuring the user
        const { email, username, password } = newUser;

        // Comprobamos si el mail esta en uso
        const foundEmail =  await User.findOne({email});
        if(foundEmail) throw new Error('El email está en uso');

        // Comprobamos si el username existe
        const foundUsername = await User.findOne({username});
        if(foundUsername) throw new Error('El nombre de usuario ya existe');

        // Encriptar 
        const salt = await bcryptjs.genSaltSync(10);
        newUser.password = await bcryptjs.hash(password, salt);

        try {
          const user = new User(newUser);
          user.save();
          return user;
        } catch (error) {
          console.log(error)
        }
}

// Login
async function login(input) {

  const { email, password } = input;

  const userFound = await User.findOne({email: email.toLowerCase()});
  if(!userFound) throw new Error('Error en el mail o contraseña');

  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if(!passwordSuccess) throw new Error ('Error en el mail o contraseña');


  return {
    token: createToken(userFound, process.env.SECRET_KEY, "1h"),  
  };

}

module.exports = {
    register,
    login
}