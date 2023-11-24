const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

// creación de esquema en base de datos
const userSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  // campos que se envían desde el frontend
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  fantasyName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactEmail: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true
  },
  active: {
    type: String,
    default: true
  },
  rating: {
    type: Number,
  },
  comments: {
    type: String,
  },
  otp: {
    type: String,
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('No se encuentra una contraseña para comparar');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error mientras se comparaba las contraseñas', error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Email inválido');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('Error en isThisEmailInUse method', error.message);
    return false;
  }
};

userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });
module.exports = mongoose.model('User', userSchema);
