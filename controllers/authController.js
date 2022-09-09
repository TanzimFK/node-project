const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username: username,
            password: hashpassword
        });
        res.json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({ status: "failed", error: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        let error = { status: "failed", message: "Incorrect password or username" }

        const user = await User.findOne({ username })

        if (!user)
            return res.status(404).json(error)

        const isCoreect = await bcrypt.compare(password, user.password)

        if (!isCoreect)
            return res.status(404).json(error)

        req.session.user = user
        return res.json({ status: "success" })

        //if no match


    } catch (err) {
        res.status(400).json({ status: "failed", error: err.message })
    }

}
