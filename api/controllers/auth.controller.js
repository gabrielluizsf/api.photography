import bcrypt from 'bcrypt';
import { loginService, generateToken} from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginService(email);
            
         if (!user) {
            return res.status(400).send({ message: "User or Password not found" });
         }
        const passwordIsValid = await bcrypt.compare(password, user.password);
         if (!passwordIsValid ) {
            return res.status(400).send({ message: "User or Password not found" });
         }

         const token = generateToken(user.id);

        res.send({token:token});
    } catch (error) {
      res.status(500).send({ 'message': error.message })
    }
};

export { login };