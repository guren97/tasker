import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    user_role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    first_name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Exclude the password field from the JSON output
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
  },
});

//Hash password and create salt before sending to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// :: GENERATE USER TOKEN
// UserSchema.methods.getSignedToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// // Match password function
// // validating password if input is equals from password retrieved from the server
// // if true, proceed to looging in the user
// UserSchema.methods.matchPasswords = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// UserSchema.methods.validateEmail = async function () {
//   const emailRegex =
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return emailRegex.test(this.email); // Test the email address against the regular expression
// };

const User = mongoose.model("User", UserSchema);
export default User;
