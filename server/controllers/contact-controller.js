const { User, Contact } = require("../models")

module.exports = {

    // /api/contact/userId/friendId
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
            const currUser = await User.findOneAndUpdate({ _id: userId }, { $push: { contacts: contact._id } }, { new: true })
            await User.findOneAndUpdate({ _id: friendId }, { $push: { contacts: contact._id } }, { new: true })

            const sender = await User.findById(currUser._id).populate({
                path: 'contacts',
                populate: {
                    path: 'sendingUser',
                    select: 'username image'
                }
            }).populate({
                path: 'contacts',
                populate: {
                    path: 'recievingUser',
                    select: 'username image'
                }
            })
            console.log(sender)

            res.status(200).json({ contacts: sender.contacts })
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

    // /api/contact/contactId
    async acceptRequest(req, res) {
        try {
            // When I accept a pending contact request
            const contact = Contact.findOneAndUpdate({
                _id: req.params.contactId
            }, {
                pending: false
            })

            // update users contacts arrays
            res.status(200).json(data)
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

    // /api/contact/contactId
    async cancelRequest(req, res) {
        try {
            const contact = await Contact.findByIdAndDelete(req.params.contactId)
            console.log(contact)
            const sender = await User.findByIdAndUpdate(contact.sendingUser, {
                $pull: { contacts: { _id: contact._id } }
            }, { new: true })
            const reciever = await User.findByIdAndUpdate(contact.recievingUser, {
                $pull: { contacts: { _id: contact._id } }
            }, { new: true })

            res.status(200).json({ sender: { _id: sender._id, username: sender.username, contacts: sender.contacts }, reciever: { _id: reciever._id, username: reciever.username, contacts: reciever.contacts } })
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error)
        }
    },

}