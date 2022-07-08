const bcrypt = require("bcryptjs");

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          res.status(200).send(users[i])
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const { username, email, firstName, lastName, password } = req.body;

        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt);

        let regObj = {
          username: [username],
          email: [email],
          firstName: [firstName],
          lastName: [lastName],
          passwordHash
        }

        users.push(regObj)
        let registeredToReturn = {...regObj};
        delete registeredToReturn.passwordHash;
        res.status(200).send(registeredToReturn);
    }
}