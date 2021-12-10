const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

module.exports = {
  async signIn(request, response) {
    try {
      const user = await UserModel.get();
      const { username, password } = request.body;

      if (user.username === username && user.password === password) {
        const AcessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '5h',
        });
        delete user.password;
        return response.status(200).json({ user, AcessToken });
      }
    } catch (error) {
      return response.status(500).json({ notification: 'Error while trying to validate credentials' });
    }
  },
};
