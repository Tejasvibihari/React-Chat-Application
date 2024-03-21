import bcrypt from 'bcrypt';
import User from '../model/user.model.js';

export const signup = async (req, res) => {
    const { email, password, userName } = req.body;
    try {
        const checkUser = await User.findOne({ email: email })
        const checkUserName = await User.findOne({ userName: userName })
        if (checkUser || checkUserName) {
            return res.status(400).json({ message: "User already exists" })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 12)
                const newUser = new User({
                    userName: userName,
                    email: email,
                    password: hashedPassword
                })
                const user = await newUser.save()
                res.json(user).status(201);
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }

};