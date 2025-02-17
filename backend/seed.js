const mongoose = require('mongoose');
const Movement = require('./collections/Movement');
const Workout = require('./collections/Workout');
require('dotenv').config();

const movements = [
    {
        name: "Push-up",
        description: "A classic bodyweight exercise that targets chest, shoulders, and triceps",
        type: "strength",
        equipment: ["none"],
        difficulty: "beginner"
    },
    {
        name: "Pull-up",
        description: "An upper body exercise that targets back and biceps",
        type: "strength",
        equipment: ["pull-up bar"],
        difficulty: "intermediate"
    },
    {
        name: "Bench Press",
        description: "A compound exercise targeting chest, shoulders, and triceps",
        type: "strength",
        equipment: ["barbell", "bench"],
        difficulty: "intermediate"
    },
    {
        name: "Dumbbell Row",
        description: "A unilateral back exercise that also works core stability",
        type: "strength",
        equipment: ["dumbbells"],
        difficulty: "beginner"
    },

    {
        name: "Barbell Squat",
        description: "A compound exercise that targets legs and core",
        type: "strength",
        equipment: ["barbell", "rack"],
        difficulty: "intermediate"
    },
    {
        name: "Deadlift",
        description: "A compound movement targeting posterior chain",
        type: "strength",
        equipment: ["barbell"],
        difficulty: "intermediate"
    },
    {
        name: "Lunges",
        description: "A unilateral leg exercise great for balance and strength",
        type: "strength",
        equipment: ["none"],
        difficulty: "beginner"
    },

    {
        name: "Running",
        description: "Cardiovascular exercise that improves endurance",
        type: "cardio",
        equipment: ["none"],
        difficulty: "beginner"
    },
    {
        name: "Jump Rope",
        description: "High-intensity cardio that improves coordination",
        type: "cardio",
        equipment: ["jump rope"],
        difficulty: "beginner"
    },
    {
        name: "Burpees",
        description: "Full-body cardio movement that builds endurance",
        type: "cardio",
        equipment: ["none"],
        difficulty: "intermediate"
    },
    {
        name: "Crunches",
        description: "Full-body resistance movement that improves core strength ",
        type: "strength",
        equipment: ["none"],
        difficulty: "beginner"
    },
    {
        name: "Plank",
        description: "Full-body core movement that builds strength",
        type: "strength",
        equipment: ["none"],
        difficulty: "beginner"
    }
    {
        name: "Jumping Jacks",
        description: "Full-body cardio movement that engages your whole body",
        type: "cardio",
        equipment: ["none"],
        difficulty: "beginner"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Movement.deleteMany({});
        await Workout.deleteMany({});
        const insertedMovements = await Movement.insertMany(movements);
        const workouts = [
            {
                name: "Beginner Full Body",
                description: "A simple full-body workout perfect for beginners",
                movements: [
                    {
                        movement: insertedMovements.find(m => m.name === "Push-up")._id,
                        sets: 3,
                        reps: 10
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Lunges")._id,
                        sets: 3,
                        reps: 10
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Dumbbell Row")._id,
                        sets: 3,
                        reps: 12
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Crunches")._id,
                        sets: 3,
                        reps: 10
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Plank")._id,
                        sets: 3,
                        reps: 20
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Jumping Jacks")._id,
                        sets: 3
                        reps: 15
                    }
                ],
                difficulty: "beginner",
                estimatedTime: 30
            },
            {
                name: "Intermediate Strength",
                description: "A challenging compound movement focused workout",
                movements: [
                    {
                        movement: insertedMovements.find(m => m.name === "Bench Press")._id,
                        sets: 4,
                        reps: 8
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Barbell Squat")._id,
                        sets: 4,
                        reps: 8
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Deadlift")._id,
                        sets: 3,
                        reps: 6
                    }
                ],
                difficulty: "intermediate",
                estimatedTime: 45
            },
            {
                name: "HIIT Cardio Blast",
                description: "High-intensity interval training for maximum calorie burn",
                movements: [
                    {
                        movement: insertedMovements.find(m => m.name === "Burpees")._id,
                        sets: 4,
                        reps: 15
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Jump Rope")._id,
                        sets: 4,
                        duration: 1 
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Running")._id,
                        sets: 4,
                        duration: 2 
                    }
                ],
                difficulty: "intermediate",
                estimatedTime: 25
            },
            {
                name: "Upper Body Focus",
                description: "Build upper body strength and muscle",
                movements: [
                    {
                        movement: insertedMovements.find(m => m.name === "Pull-up")._id,
                        sets: 4,
                        reps: 6
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Push-up")._id,
                        sets: 3,
                        reps: 15
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Bench Press")._id,
                        sets: 3,
                        reps: 10
                    }
                ],
                difficulty: "intermediate",
                estimatedTime: 40
            },
            {
                name: "Quick Cardio",
                description: "Short but effective cardio session",
                movements: [
                    {
                        movement: insertedMovements.find(m => m.name === "Jump Rope")._id,
                        sets: 3,
                        duration: 3 
                    },
                    {
                        movement: insertedMovements.find(m => m.name === "Burpees")._id,
                        sets: 3,
                        reps: 10
                    }
                ],
                difficulty: "beginner",
                estimatedTime: 15
            }
        ];

        await Workout.insertMany(workouts);
        console.log('Inserted workouts');

        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
