exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    console.log(err)
    res.render('404')
  }
};


exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    // Redirecionar para a página de login
    req.flash('errors', 'Você precisa estar logado para acessar esta página.');
    return res.redirect('/login');
  }
  next(); // Se o usuário estiver logado, continue para a próxima função
};

