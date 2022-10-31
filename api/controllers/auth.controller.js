import authService  from "../services/auth.service.js";
import bcrypt  from "bcrypt";

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await authService.loginService(email);

    if(!user) {
        return res.status(400).send({message: "Invalid User or Password"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).send({message: "Invalid User or Password"})
    }

    const token = authService.generateToken(user.id);


    res.send({token});
}

export{login}
