


const User = require("../models/users.model"); // Adjust path as needed

// Controller to fetch all todos
const signup= async (req, res) => {
	try {
        const {username, email, password } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}
        if(password.length<6){
            return res.status(400).json({message:"Password must me Atleast 6 character long"})
        }

        const newUser = new User({
			username,
			email,
			password,
            dob
		});

        await newUser.save();

        return res.status(201).json({message:'Signup successfull'})

    } catch (error) {
        
    }
};


module.exports = {
    signup,
};









