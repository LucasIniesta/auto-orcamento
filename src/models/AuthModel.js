const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcrypt')

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const AuthModel = mongoose.model('Auth', AuthSchema);

class Auth {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async register() {
    this.validate()
    if(this.errors.length > 0) return



    await this.userExists()

    if(this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)


    try {
      this.user = await AuthModel.create(this.body)
    } catch(e) {
      console.log(e)
    }
  }
  
  async userExists() {
    const user = await AuthModel.findOne({email: this.body.email})

    if(user) this.errors.push('Usuário já existe')
  }

  validate() {
    if(this.body.password !== this.body.confirmPassword) {
      console.log('deu ruim')
      this.errors.push('Senhas não conferem')
      return
    }

    this.cleanUp()

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
      
    if(this.body.password.length < 6 || this.body.length > 50) this.errors.push('Senha precisa ter entre 6 e 50 caracteres')

  }

  cleanUp() {
    for(let key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }

      this.body = {
        name: this.body.name,
        email: this.body.email,
        password: this.body.password
      }
    }
  }

  
}

module.exports = Auth;
