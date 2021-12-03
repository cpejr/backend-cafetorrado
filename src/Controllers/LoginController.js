const jwt = require('jsonwebtoken');

module.exports = {
  async signIn(request, response) {
    try {
      const { username, password } = request.body;
      // const user = await UsuarioModel.getByFields({ firebase_id: uid });
      const AcessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5h',
      });

      return response.status(200).json({ user, AcessToken });
    } catch (error) {
      return response.status(500).json({ notification: 'Error while trying to validate credentials' });
    }
  },
};
