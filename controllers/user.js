const User = require('../models/user')
const bcrypt = require('bcrypt')

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
        const salt = await bcrypt.genSaltSync(10);
        newUser.password = await bcrypt.hash(password, salt);

        try {
          const user = new User(newUser);
          user.save();
          return user;
        } catch (error) {
          console.log(error)
        }
}

module.exports = {
    register
}