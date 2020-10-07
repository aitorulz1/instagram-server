const { UserInputError } = require("apollo-server");

const resolvers = {
    Query: {
        // User
        getUser: () =>  {
          console.log('Obteniendo usuario');
          return null;
        },
    },
    Mutation: {
      register: (_, { input }) => {
        console.log('Registrando usuarios');
        console.log(input);
        return input;
      },
    },
};

module.exports = resolvers;