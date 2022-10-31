import User from "../models/User.js";

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserSevice = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateUserService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
    {
      rawResult: true,
    }
  );

export default {
  findByEmailUserService,
  createUserSevice,
  findAllUserService,
  findByIdUserService,
  updateUserService,
};
export  {findByIdUserService};
