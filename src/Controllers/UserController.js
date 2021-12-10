const UserModel = require('../Models/UserModel');

module.exports = {
  async create(request, response) {
    try {
      const user = request.body;
      console.log(user);

      const result = await UserModel.create(user);

      return response.status(200).json({ user_id: result });
    } catch (error) {
      console.warn('Usuario creation failed:', error);

      return response.status(500).json({ notification: 'internal server error trying to create usuario' });
    }
  },
};
