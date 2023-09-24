const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.isAuth = async (req, res, next) => {
  /*  
      #swagger.parameters['authorization'] = {
          in: 'header',
          description: "Auth API.",
          required: true
      }
  */
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    const token = parts[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Sesión expirada, ingrese nuevamente',
        });
      }
      else
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
  }
};