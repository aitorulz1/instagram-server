const User = require('../models/user')


const resolvers = {
    Query: {
        // User
        getUser: () =>  {
          console.log('Obteniendo usuario');
          return null;
        },
    },
    Mutation: {
      register: async (_, { input }) => {
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


        try {
          const user = new User(newUser);
          user.save();
          return user;
        } catch (error) {
          console.log(error)
        }
      },
    },
};

module.exports = resolvers;