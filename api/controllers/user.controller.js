import userService from "../services/user.service.js";


const create = async (req, res) => {
   try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name || !username || !email || !password || !avatar || !background) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const user = await userService.createService(req.body);
      if (!user) {
         return res.status(400).send({ message: "[ERROR] Creating User Fail" });
      }
      res.status(201).send({
         message: "user created successfully",
         user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
         },
      });
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}


const findAllUsers = async (req, res) => {
   try {
      const users = await userService.findAllService();
      if (users.length === 0) {
         return res.status(400).send({ message: "[ERROR]0 USERS REGISTERED" });
      }
      res.send(users)
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const findById = async (req, res) => {
   try {
      const user = req.user;
      res.send(user);
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const updateUserById = async (req, res) => {
   try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const { id, user } = req;

      await userService.updateServiceById(
         id,
         name,
         username,
         email,
         password,
         avatar,
         background
      );
      res.send({ message: "User successfully updated!" });
   }
   catch (err) {
    res.status(500).send({ message: err.message });
   };
}

export default { create, findAllUsers, findById, updateUserById };