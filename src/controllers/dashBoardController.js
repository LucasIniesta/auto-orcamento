exports.index  = (req, res) => {
    res.render('dashboard')
}

exports.logOut = (req,res) => {
    req.session.destroy()
    res.redirect('/')
}