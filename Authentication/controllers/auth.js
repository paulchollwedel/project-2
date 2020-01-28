const withAuth = (req, res, next) => {
    if (!req.session.userID){
        req.redirect("/login");

    } else {
        next();
    }
};

module.exports = withAuth;