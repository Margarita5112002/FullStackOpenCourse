const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "The name must be at least 3 characters long"],
        required: [true, "Name is required"]
    }, 
    number: {
        type: String,
        minLength: [8, "The number must be at least 8 characters long"],
        validate : {
            validator : (v) => {
                return /^\d{2,3}-\d{4,}$/.test(v)
            },
            message: props => `${props.value} isn't a number`
        },
        required: [true, "Number is required"]
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)