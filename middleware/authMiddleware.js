const protect = (req, res, next) => {
    const {user} = req.session

    if(!user)
         return res.status(401).json({message: 'unauthorized', status: "failed"})

    req.user = user;

    next()
}

module.exports = protect;


