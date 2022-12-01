const { Schema, model } = require("mongoose")


const contactSchema = new Schema(
    {
        sendingUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        recievingUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        pending: {
            type: Boolean,
            required: true
        }
    }
)



const Contact = model("Contact", contactSchema);

module.exports = Contact;
