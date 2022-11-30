const { Schema, model, Types } = require("mongoose")


const contactSchema = new Schema(
    {
        sendingUser: {
            type: Types.ObjectId,
            ref: 'User',
        },
        recievingUser: {
            type: Types.ObjectId,
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
