// const mongoose = require("mongoose");
// const User = require("../collections/User");
// const LoggedWorkout = require("../collections/LoggedWorkout");
// const sendEmail = require("./sendMail");
// const cron = require("node-cron");
// require("dotenv").config();

// const checkMissedWorkouts = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);

//         const today = new Date().toDateString();
//         const todayDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];

//         const usersWithScheduledWorkout = await User.find({ [`schedule.${todayDay}`]: { $exists: true, $ne: [] } });
//         for (const user of usersWithScheduledWorkout) {
//             const loggedToday = user.loggedWorkouts.some(loggedWorkout =>
//                 new Date(loggedWorkout.date).toDateString() === today
//             );

//             if (!loggedToday) {
//                 await sendEmail(user.email, "Missed Workout Reminder", `Hey ${user.name}!\n\nYou have a workout scheduled for today that you did not complete yet. Go to Momentum now and complete it to stay on track!`);
//             }
//         }
//         mongoose.connection.close();
//     } catch (error) {
//         console.log(error);
//     }
// };

// cron.schedule("0 20 * * *", () => {
//     checkMissedWorkouts();
// });