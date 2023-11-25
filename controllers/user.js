const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Favorites = require('../models/favorites');
const bcrypt = require('bcrypt');
const sendMail = require('./email');

exports.createUser = async (req, res) => {
  /*  
      #swagger.description = Create a user
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              firstName: "Pepe",
              lastName: "Argento",
              email: "review@gmail.com",
              password: "",
              role: "client"
          }
      }
      #swagger.tags = ['Users']
  */
  const {
    firstName,
    lastName,
    email,
    password,
    role
  } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser) {
    return res.status(409).json({
      success: false,
      message: 'Este email ya existe en la plataforma. Si no recuerda la contraseña la puede recuperar',
    });
  }
  const user = await User({
    firstName,
    lastName,
    email,
    password,
    role
  });
  try {
    sendMail.send(email, "Bienvenido " + firstName + " a My Home", "Bienvenido! Se creó la cuenta con éxito.")
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: 'No se puede enviar el email: ' + error.message,
    });
  }
  await user.save();
  res.status(201).json({ success: true, user });
};

exports.getUser = async (req, res) => {
  /*  
      #swagger.description = Get user information by email (login).
      #swagger.parameters['email'] = {
        in: 'query',
        description: "email to get user information",
        required: true,
        type: "string"
      }
      #swagger.tags = ['Users']
  */
  const email = req.query.email;
  const user = await User.findOne({ email }).select('-password');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario ' + email + ' en la base de datos',
    });
  }
  else {
    const UserId = user._id.toString();
    console.log(UserId)
    const favorites = await Favorites.findOne({ user: UserId }).select('properties');
    console.log(favorites)
    if (!favorites) {
      return res.status(200).json({ success: true, user: user });
    } else {
      return res.status(200).json({ success: true, user: user, favorites: favorites });
    }
  }
};

exports.getUsers = async (req, res) => {
  /*  
      #swagger.description = Get all users
      #swagger.tags = ['Users']
  */
  const users = await User.find({}).select('-password');

  if (users.length === 0)
    return res.status(404).json({
      success: false,
      message: 'No se encuentran usuarios en la base de datos',
    });

  res.json({ success: true, user: users });
};

exports.userSignIn = async (req, res) => {
  /*  #swagger.description = User login
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              email: "review@gmail.com",
              password: ""
          }
      }
      #swagger.tags = ['Users']
  */
  const { email, password } = req.body;

  var user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos',
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({
      success: false,
      message: 'La contraseña es invalida',
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1800s',
  });

  const bearerToken = "Bearer " + token

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  user.password = undefined;
  return res.status(200).json({ success: true, bearerToken, user: user });
};

exports.signOut = async (req, res) => {
  /*  
      #swagger.description = Logout user
      #swagger.tags = ['Users']
  */
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Autorización fallida!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    return res.status(200).json({ success: true, message: 'Cierre de sesión exitosa' });
  }
};

const generateSixDigitToken = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.requestPasswordReset = async (req, res) => {
  /*  
      #swagger.description = Request change password and get OTP by email.
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              email: "usuario@example.com"
          }
      }
      #swagger.tags = ['Users']
  */
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { otp } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No se encuentra el usuario en la base de datos.',
      });
    }

    sendMail.send(email, 'Código de verificación', `Tu código de verificación es: ${otp}`);

    return res.status(200).json({ success: true, message: 'Se ha enviado el OTP al correo electrónico del usuario.' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al generar y guardar el OTP en la base de datos: ' + error.message,
    });
  }
}

exports.validateOTPAndChangePassword = async (req, res) => {
  /*  
      #swagger.description = Validate OTP and change user password.
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
              email: "usuario@example.com",
              otp: "123456", 
              newPassword: "nuevaContraseña123" 
          }
      }
      #swagger.tags = ['Users']
  */
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'El OTP ingresado no es válido.',
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: newPasswordHash, otp: undefined } }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'No se encuentra el usuario en la base de datos o no se puede actualizar.',
      });
    }

    return res.status(200).json({ success: true, message: 'Contraseña modificada exitosamente.' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al validar el OTP y cambiar la contraseña en la base de datos: ' + error.message,
    });
  }
};

exports.updateFieldUser = async (req, res) => {
  /*  
      #swagger.description = Update a field for a user.
      #swagger.parameters['id'] = {
          in: 'path',
          description: "User ID.",
          required: true,
          type: "number"
      }
      #swagger.parameters['body'] = {
          in: 'body',
          description: "Field to update.",
          required: true,
          schema: {
              key: "value"
          }
      }
      #swagger.tags = ['Users']
  */
  const {
    id,
  } = req.path;
  if (id === "no existe") {
    res.status(404).json({ success: false, message: "Dummy response" })
  }

  const {
    field,
  } = req.body;
  if (field === "no existe") {
    res.status(409).json({ success: false, message: "Dummy response" })
  }

  res.status(200).json({ success: true, message: "Method not allowed" });
};

exports.deleteUser = async (req, res) => {
  /*  
      #swagger.description = Delete a user
      #swagger.parameters['id'] = {
          in: 'path',
          description: "User ID.",
          required: true,
          type: "number"
      }
      #swagger.tags = ['Users']
  */
  const {
    id,
  } = req.path;
  if (id === "no existe") {
    res.status(404).json({ success: false, message: "Dummy response" })
  }

  res.status(204).json({ success: true, message: "Dummy response" });
};