import express from 'express'
const router= express.Router()
import { celebrate, Joi, isCelebrateError} from 'celebrate'
import User from "./user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const celebrateErrorHandler = (error, req, res, next) => {
    if (isCelebrateError(error)) {
      return res.status(400).json({ 
        message: error.details.get('body').message
      });
    }
    next(error); 
  };

const userValidationSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email' : 'Invalid email address',
        'any.required': 'Email is required',
      }),
    username: Joi.string().alphanum().min(3).max(50).required().messages({
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required',
        'string.min' : 'Username must be at least three characters',
        'string.alphanumeric' : 'Username must only consist of letters and numbers'
      }),
     name: Joi.string().alpha().min(3).max(50).required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
        'string.min' : 'Name must be at least three characters',
        'string.alpha' : 'Name must only consist of letters'
      }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required',
        'string.min' : 'Password must be at least eight characters',
      }),
    repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only' : 'Passwords do not match.'
      }),
})

router.post('/join', celebrate({
    body: userValidationSchema
}), celebrateErrorHandler, async (req, res) => {
    try {
        const { email, username, name, password, repeat_password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser.rows.length > 0) {
            return res.status(409).json({message : 'Email is already in use.'})
        }

        const usernameTaken = await User.findOne({ username })
        if (usernameTaken.rows.length > 0) {
            return res.status(409).json({message : 'Username is taken.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const addedUser = new User({ email, username, name, hashedPassword }) 
        await addedUser.save()
        res.status(201).json({ message: 'Joined Momentum successfully!', user: addedUser.rows[0] });
    } catch (error) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body

        const existingUser = await User.findOne({
            $or: [{ email: user }, { username: user }],
        });

        if (existingUser.rows.length == 0) {
            return res.status(409).json({ message: 'No account exists for that username/email' });
        }

        const matchingPassword = await bcrypt.compare(password, existingUser.rows[0].password)

        if(!matchingPassword) {
            return res.status(401).json({message : 'Incorrect password.'})
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email, username: existingUser.username },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "24h" }
        );

        return res.status(201).json({ message: 'Logged into Momentum successfully!', token });
    } catch (error) {
        res.status(500).json({message : error})
    }
})

export default router;