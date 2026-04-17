import StatusCodes from 'http-status-codes'
import User from '../models/userModel.js'

const register = async (req, res) => {
    const { email, password, name } = req.body
    console.log(req.body);
    
    if (!email || !password || !name) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'All fields are required'})
    }
    
    const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({user});
};

const login = async (req, res) => {
  res.send('login');
};

export { login, register };
