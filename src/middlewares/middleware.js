exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
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
