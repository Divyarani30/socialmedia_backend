const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// router.post("/signup", async (req, res) => {
//     console.log("outside coming inside", req.body);
//     try {
//         console.log("coming inside", req.body);
//         const { username, email, password } = req.body;
//         console.log("coming inside", username, email, password);
//         //encrypt new password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         console.log("hash", hashPassword)
//         //create new user
//         const newUser = new User({
//             username, email, password: hashPassword
//         });
//         console.log("newUser", newUser)

//         const user = await User.create(newUser);
//         console.log("user", user)
//         res.status(200).json({
//             message: 'registered successfully',
//             userLoginDetails: user
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'facing issue while register, please try again'
//         })
//         console.log("facing issue while register", error)
//     }

// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const isExistingUser = await User.findOne({ email });
//         !isExistingUser && res.status(404).json({message: "user not found, please sign up"});

//         const isValidPassword = await bcrypt.compare(password, isExistingUser.password);
//         !isValidPassword && res.status(400).json({
//             message: "invalid password"
//         })
//         res.status(200).json({
//             message: "logged in successfully",
//             user : isExistingUser
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: 'facing issue while login, please try again'
//         })
//         console.log("facing issue while login", error)
//     }

// });

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("coming inside", id);

        const fetchUser = await User.findOne({ _id: id });
        console.log("coming inside", fetchUser);

        !fetchUser && res.status(404).json({
            message: "user not found"
        });

        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        });
        res.status(200).json({
            message: "details updated successfully",
            user: updateUser
        })
    } catch (error) {
        res.status(500).json({
            message: "facing issue while update",
        });
        console.log("facing issue while update", error)
    }
})

module.exports = router;