const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  campus: {
    type: String,
    enum: ['Madrid', 'Barcelona', 'Miami', 'Paris', 'Berlín', 'Amsterdam', 'México', 'Sao Paulo']
  },
  course: {
    type: 'String',
    enum: ['WebDev', 'UX/UI', 'Data Analytics']
  },
  photo: String
}, 
{
  timestamps: true,
  versionKey: false
})

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)