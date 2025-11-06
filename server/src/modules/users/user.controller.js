// user.controller.js
import JWT from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.js";

export default class UserController {
  constructor(userRepository){
    this.userRepo=userRepository;
  }

  // sign Up middleware
  postSignUp=async(req, res)=>{
    try {
      const result = await this.userRepo.signUp(req.body);
  
      if (result.status === "EMAIL_ALREADY_REGISTERED") {
        return res.status(409).json({ error: "Email already registered" });
      } else if (result.status === "SUCCESS") {
        return res.status(201).json(result.newUser);
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json({error: error.message });
    }
  }

  // sign In middleware
  postSignIn=async(req, res)=> {
    try {
      const result = await this.userRepo.signIn(req.body);
  
      if (result.status === "USER_NOT_FOUND") {
        return res.status(404).json({ error: "User not found" });
      } else if (result.status === "INCORRECT_PASSWORD") {
        return res.status(401).json({ error: "Incorrect password" });
      } else if (result.status === "SUCCESS") {

        // create token on signin , after user auth
        const token=JWT.sign(
          {userId: result.user.id, role: result.user.role}, // payload
          SECRET_KEY, // secret key
          {
            expiresIn: "1h" //when token expires
          }
        );

        // send token
        return res.status(200).json({
          // message: `Welcome, ${result.user.name}`,
          userId: result.user.id,
          role: result.user.role,
          token: token
        });

      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
