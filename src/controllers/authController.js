const Auth = require('../models/AuthModel')

exports.index = (req, res) => {
  res.render('index');
};

exports.login = (req, res) => {
  res.render('login')
}

exports.register = (req, res) => {
  res.render('register')
}

exports.processRegister = async (req, res) => {
  try{
    const auth = new Auth(req.body);
    await auth.register();
  
    if (auth.errors.length > 0) {
      req.flash('errors', auth.errors);
      return req.session.save(() => res.redirect('/register'));
    }

    req.flash('success', 'Usuário criado com sucesso')
    req.session.save(() => res.redirect('/login'))
  
  }catch(e) {
    res.render('404')
    console.log(e)
  }
  
};
