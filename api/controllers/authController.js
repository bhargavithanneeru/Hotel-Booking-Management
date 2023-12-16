import User from "../models/User.js"
import bcrypt from "bcryptjs"
import zxcvbn from "zxcvbn"
import { createError } from '../utils/error.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import nodemailer from "nodemailer";
dotenv.config()

var transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export const register = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        const error = createError(409, "User with this email already exists");
        return next(error);
      }
  
      // Check if the password meets the strength criteria using zxcvbn
      const passwordStrength = zxcvbn(password);
  
      // Define a minimum score for what you consider a strong password
      const minPasswordScore = 2;
  
      if (passwordStrength.score < minPasswordScore) {
        const error = createError(400, "Weak password. Please choose a stronger password.");
        return next(error);
      }
  
      // If the user is not already registered and the password is strong, proceed with user registration
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User has been created");
    } catch (err) {
      const error = createError(500, "User registration failed", err);
      next(error);
    }
  }

export const login = async (req, res, next) => {
    try {
      // Retrieve the user based on the email provided in the request
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return next(createError(404, "User not found!"));
      }
  
      // Use bcrypt.compare to compare the provided password with the stored hash
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isPasswordCorrect) {
        return next(createError(400, "Wrong Password or Username!"));
      }
      const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.SECRET)

      const { password, isAdmin, ...otherDetails } = user._doc;
  
      // Passwords match, you can proceed with authentication or send a success response.
      res.cookie("access_token",token)
      .status(200).json({details:{...otherDetails}, isAdmin});
    } catch (err) {
      next(err);
    }
  }

export const forgotpassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        //console.log({user})
        console.log(err.response.data)
        return next(createError(404, "User not found!"));
      }
  
      // Generate a unique reset token and expiration time
      const resetToken = jwt.sign({ id: user._id }, process.env.RESET_SECRET, {
        expiresIn: '1h', // Set the expiration time as needed
      });
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();

  
      // Send an email with a link containing the reset token
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      const mailOptions = {
        from: 'your email address',
        to: user.email,
        subject: 'Password Reset Link',
        html: `Click <a href="${resetLink}">here</a> to reset your password.`,
      };
      
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message)
          //console.log(err.response.data)
          return next(createError(500, "Email could not be sent. Please try again later."));
        }
      });

  
      return res.status(200).json("Password reset link has been sent to your email.");
    } catch (err) {
      return next(createError(500, "User not found!"));
    }
  };
  
  // Add a function to handle password reset based on the reset token
  export const resetpassword = async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    // Verify and decode the reset token
    jwt.verify(resetToken, process.env.RESET_SECRET, async (err, decoded) => {
      if (err) {
        return next(createError(400, "Invalid or expired reset token."));
      }
  
      // Find the user associated with the reset token
      let userErr,user = await User.findOne({ _id: decoded.id });

        if (userErr || !user) {
          return next(createError(404, "User not found."));
        }
  
        // Check if the reset token is expired
        if (Date.now() > user.resetPasswordExpires) {
          return next(createError(400, "Reset token has expired."));
        }
  
        // Hash and save the new password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        user.password = hash;
  
        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        
        let saveerr,saveuser = await User.updateOne({_id:user._id},user);
        // Save the updated user document
          if (saveerr) {
            return next(createError(500, "Password reset failed. Please try again."));
          }

          return res.status(200).json("Password has been reset successfully.");
        });
      
    
  };
  
  

  










  

  
