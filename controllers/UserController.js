// controllers/UserController.js
const { User } = require("../models");

const userController = {
  signup: async (req, res) => {
    try {
      const { name, email, age, batch } = req.body;

      // Check if the user already exists
      console.log(User);
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        // Check if the month and year of updatedAt are the same
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const updatedAtMonth = existingUser.updatedAt.getMonth();
        const updatedAtYear = existingUser.updatedAt.getFullYear();

        if (currentMonth === updatedAtMonth && currentYear === updatedAtYear) {
          return res
            .status(409)
            .json({ error: "User already enrolled this month" });
        }

        // Update user details and set updatedAt timestamp
        await existingUser.update({ name, age, batch });
        return res.status(200).json({ message: "User updated successfully" });
      }

      // Create a new user
      const newUser = await User.create({ name, email, age, batch });

      // Respond with the new user data
      res
        .status(201)
        .json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
