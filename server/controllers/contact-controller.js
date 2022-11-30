const { User, Contact } = require("../models")

module.exports = {

    async requestContact(req, res) {
        console.log('\nhit\n')
        try {
            const { friendId, userId } = req.params
            // When I click add on contacts search result
            // create contact with pending true
            const contact = await Contact.create({
                sendingUser: userId,
                recievingUser: friendId,
                pending: true
            })
            const sender = await User.findOneAndUpdate({ _id: userId }, { $push: { contacts: contact._id } }, { new: true })
            const reciever = await User.findOneAndUpdate({ _id: friendId }, { $push: { contacts: contact._id } }, { new: true })

            const data = {sender, reciever}
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

    async addContact(req, res) {
        try {
            // When I accept a pending contact request
            // set existing contact to pending false
            // update users contats arrays
            res.status(200).json(data)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

    async cancelRequest(req, res) {
        try {
            // When I cancel a sent request or decline a pending request
            // create contact with pending true
            res.status(200).json(data)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

}