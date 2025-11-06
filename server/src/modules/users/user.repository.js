// user.repository.js
import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import {PEPPER_SECRET} from "../../config/env.js";
import {getDB} from "../../config/mongodb.js";

export default class UserRepository {
  constructor(){
    this.collection=null;
  }

  // lazy initialization of collection
  async getCollection(){
    if(!this.collection){
      this.collection=getDB().collection("users");
    }
    return this.collection;
  }

  // method for sign Up
  async signUp({ name, email, password, role }) {
    try {
      const collection=await this.getCollection(); // initialize collection first

      // check if user already exists
      const existingUser = await this.collection.findOne({ email });
      if (existingUser) {
        return { status: "EMAIL_ALREADY_REGISTERED" };
      }

      // create hashed password
      const hashPassword=await bcrypt.hash(password+PEPPER_SECRET,12);

      // create document
      const newUser=new UserModel(name,email,hashPassword,role);

      // insert document
      const result=await collection.insertOne(newUser);

      if(!result.acknowledged){
        throw new Error("Error inserting user");
      }

      const {password:_,...safeUser}=newUser; // removes password from safeUser using rest operator
      return { status: "SUCCESS", newUser: safeUser };
    } catch (error) {
      console.error("SignUp Error: ",error);
      throw new Error("Error inserting user: "+error.message);
    }
  }

  // method for sign In
  async signIn({ email, password }) {
    try {
      const collection=await this.getCollection(); // initialize collection first

      const user=await collection.findOne({email});

      if (!user) {
        return { status: "USER_NOT_FOUND" };
      }

      // convert and compare hashed password using bcrypt compare
      const match=await bcrypt.compare(password+PEPPER_SECRET,user.password);

      if (!match) {
        return { status: "INCORRECT_PASSWORD" };
      }

      const {password: _ ,...safeUser}=user; // removing password using rest operator
      // return { status: "SUCCESS", user: safeUser };      
      return { status: "SUCCESS", user:{ id: user._id.toString(), role: user.role } };
    } catch (error) {
      throw new Error("Error logging user: "+error.message);
    }
  }
}

// sample user
// var users = [
//   new UserModel (
//     '1756862084954',
//     'user2',
//     'user2@gmail.com',
//     '$2b$12$C4JoHMgLfz8TqJiCMW5KU.F.K1v1usq1PdApO0pBtpQRW4TMowdpW', // user2Pass
//     'customer'
//   ),
// ];
