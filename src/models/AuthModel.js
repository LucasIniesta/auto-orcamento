const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcrypt')

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: false },
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

  async login() {
    this.cleanUp(false)
    this.validate(false)
    if(this.errors.length > 0) return

    this.user = await AuthModel.findOne({email: this.body.email})

    if(!this.user) {
      this.errors.push('Usuário ou senha inválida')
      return
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Usuário ou senha inválida')
      this.user = null
      return
    }
  }

  async register() {
    this.cleanUp(true)
    if(this.body.password !== this.body.confirmPassword) {
      this.errors.push('Senhas não conferem')
      return
    }
    this.validate(true)
    if(this.errors.length > 0) return

    await this.userExists()

    if(this.errors.length > 0) return

    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)

    this.user = await AuthModel.create(this.body)
  }
  
  async userExists() {
    this.user = await AuthModel.findOne({email: this.body.email})
    if(this.user) this.errors.push('Usuário já existe')
  }

  validate(isRegister) {

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    
    if(isRegister){
      if(this.body.password.length < 6 || this.body.password.length > 50) this.errors.push('Senha precisa ter entre 6 e 50 caracteres')
  
      if(!this.body.name) this.errors.push('O campo nome é obrigatório')
    }
      
  }

  cleanUp(isRegister) {
    for(let key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    if(isRegister) {
      this.body = {
        name: this.body.name || '',
        email: this.body.email || '',
        password: this.body.password || '',
        confirmPassword: this.body.confirmPassword || ''
      }
    } else {
      this.body = {
        email: this.body.email || '',
        password: this.body.password || ''
      }
    }
  }

  
}

module.exports = Auth;
