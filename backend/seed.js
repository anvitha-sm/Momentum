const mongoose = require("mongoose");
const Movement = require("./src/collections/Movement");
const Workout = require("./src/collections/Workout");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

function getRandomImage() {
  const data = fs.readFileSync(
    path.join(__dirname, "./src/routes/image-urls.txt"),
    "utf8"
  );
  const urls = data.split("\n").filter(Boolean);
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex]; // Returns a randomly selected image URL
}

const movements = [
  {
    name: "Push-up",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Pull-up",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Bench Press",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Dumbbell Row",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Barbell Squat",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Deadlift",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Lunges",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Running",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Jump Rope",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Burpees",
    bodyRegion: "Full body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Plank",
    bodyRegion: "Core",
    imageUrl: getRandomImage(),
  },
  {
    name: "Leg Raise",
    bodyRegion: "Core",
    imageUrl: getRandomImage(),
  },
  {
    name: "Russian Twist",
    bodyRegion: "Core",
    imageUrl: getRandomImage(),
  },
  {
    name: "Bicycle Crunches",
    bodyRegion: "Core",
    imageUrl: getRandomImage(),
  },
  {
    name: "Kettlebell Swing",
    bodyRegion: "Full body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Box Jump",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Mountain Climber",
    bodyRegion: "Full body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Wall Sit",
    bodyRegion: "Lower body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Tricep Dip",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
  {
    name: "Shoulder Press",
    bodyRegion: "Upper body",
    imageUrl: getRandomImage(),
  },
];

// async function upsertData(Model, data) {
//   for (const item of data) {
//     await Model.updateOne(
//       { name: item.name },
//       { $set: item },
//       { upsert: true }
//     );
//   }
// }

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // await upsertData(Movement, movements);

    await Movement.deleteMany({});
    await Workout.deleteMany({});
    const insertedMovements = await Movement.insertMany(movements);
    const workouts = [
      {
        name: "Beginner Full Body",
        description: "A simple full-body workout perfect for beginners",
        bodyRegion: "Full body",
        movements: [
          {
            movement: "Push-up",
            sets: 3,
            metricType: "reps",
            metricValue: 10,
          },
          {
            movement: "Lunges",
            sets: 3,
            metricType: "reps",
            metricValue: 10,
          },
          {
            movement: "Dumbbell Row",
            sets: 3,
            metricType: "reps",
            metricValue: 12,
          },
        ],
        imageUrl: getRandomImage(),
      },
      {
        name: "Intermediate Strength",
        description: "A challenging compound movement focused workout",
        bodyRegion: "Full body",
        movements: [
          {
            movement: "Bench Press",
            sets: 4,
            metricType: "reps",
            metricValue: 8,
          },
          {
            movement: "Barbell Squat",
            sets: 4,
            metricType: "reps",
            metricValue: 8,
          },
          {
            movement: "Deadlift",
            sets: 3,
            metricType: "reps",
            metricValue: 6,
          },
        ],
        imageUrl: getRandomImage(),
      },
      {
        name: "HIIT Cardio Blast",
        description:
          "High-intensity interval training for maximum calorie burn",
        bodyRegion: "Full body",
        movements: [
          {
            movement: "Burpees",
            sets: 4,
            metricType: "reps",
            metricValue: 15,
          },
          {
            movement: "Jump Rope",
            sets: 4,
            metricType: "duration",
            metricValue: 1, // duration in minutes
          },
          {
            movement: "Running",
            sets: 4,
            metricType: "duration",
            metricValue: 2, // duration in minutes
          },
        ],
        imageUrl: getRandomImage(),
      },
      {
        name: "Upper Body Focus",
        description: "Build upper body strength and muscle",
        bodyRegion: "Upper body",
        movements: [
          {
            movement: "Pull-up",
            sets: 4,
            metricType: "reps",
            metricValue: 6,
          },
          {
            movement: "Push-up",
            sets: 3,
            metricType: "reps",
            metricValue: 15,
          },
          {
            movement: "Bench Press",
            sets: 3,
            metricType: "reps",
            metricValue: 10,
          },
        ],
        imageUrl: getRandomImage(),
      },
      {
        name: "Quick Cardio",
        description: "Short but effective cardio session",
        bodyRegion: "Full body",
        movements: [
          {
            movement: "Jump Rope",
            sets: 3,
            metricType: "duration",
            metricValue: 3, // duration in minutes
          },
          {
            movement: "Burpees",
            sets: 3,
            metricType: "reps",
            metricValue: 10,
          },
        ],
        imageUrl: getRandomImage(),
      },
    ];

    await Workout.insertMany(workouts);
    console.log("Inserted workouts");
    //await upsertData(Workout, workouts);
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
