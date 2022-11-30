import { useEffect } from "react"
import { useState } from "react"

const Modal = ({ mode, setMode, currentUser, setCurrentUser }) => {
    const { type, display } = mode

    const [contact, setContact] = useState('')
    const [friend, setFriend] = useState(null)

    const [transaction, setTransaction] = useState({
        sendingUser: '',
        recievingUser: '',
        amount: '',
        transactionText: ''
    })

    const handleSend = async e => {
        e.preventDefault()
        setTransaction({
            ...transaction,
            sendingUser: transaction.recievingUser,
            recievingUser: currentUser.id
        })
        const r = await fetch('/ap/transaction/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        })
        console.log(r)
        if (r.ok) {
            // update balances
            // reload homepage
        }
    }

    const handleRequest = async e => {
        e.preventDefault()
        setTransaction({ ...transaction, sendingUser: '' })
        const r = await fetch('/ap/transaction/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        })
        console.log(r)
    }

    useEffect(() => {
        console.log(currentUser.contacts)
    }, [currentUser])

    const checkContacts = (id) => {
        const bools = currentUser.contacts.map(c => c.sendingUser._id === id || c.recievingUser._id === id ? true : false)
        return bools.indexOf(true) > -1 ? true : false
    }

    const getFriend = async (username) => {
        const friend = await fetch(`/api/users/${username}`)
        const result = await friend.json()
        if (result?._id === currentUser.id || checkContacts(result?._id)) {
            return
        }
        setFriend(result)
    }

    const sendFriendRequest = async e => {
        e.preventDefault()
        const res = await fetch(`/api/contact/${currentUser.id}/${friend._id}`)
        const data = await res.json()
        // console.log(data)
        setCurrentUser({...currentUser, contacts: data.contacts})
        setFriend(null)
    }

    const acceptRequest = async e => {
        e.preventDefault()
    }

    const cancelRequest = async e => {
        e.preventDefault()
    }

    useEffect(() => {
        if (contact) {
            getFriend(contact)
        }
    }, [contact])

    return (
        <div
            style={{
                display: display,
                position: "absolute",
                zIndex: '1000',
                backgroundColor: 'blanchedalmond',
                width: '80%',
                height: 'auto',
                margin: '0 auto 0 auto',
                right: '0',
                left: '0',
                padding: '1rem'
            }}>
            {type === 'pay' &&
                <form className="container" >
                    <button
                        style={{
                            position: "absolute",
                            top: '.5rem',
                            right: '.5rem'
                        }}
                        onClick={() => setMode({ ...mode, display: 'none', type: '' })}
                    >X</button>

                    <label className="form-label" htmlFor='who'>Choose Contact</label>
                    <select id='who'
                        className="form-control"
                        value={transaction.recievingUser}
                        onChange={(e) => {
                            setTransaction({ ...transaction, recievingUser: e.target.value })
                        }}
                        required
                    >
                        {currentUser.contacts.map(c =>
                            <option
                                key={c._id}
                                value={c._id}
                            >{c.username}</option>
                        )}
                    </select>

                    <label className="form-label" htmlFor='for'>What's it for?</label>
                    <textarea className="form-control" id='for' value={transaction.transactionText} onChange={e => setTransaction({ ...transaction, transactionText: e.target.value })} />

                    <label className="form-label" htmlFor='amount'>How Much? {`(Balance: ${currentUser.balance})`}</label>
                    <input className='form-control' id='amount' value={transaction.amount} max={currentUser.balance} min='0' onChange={e => setTransaction({ ...transaction, amount: e.target.value })} />

                    <button className="form-control mt-2 bg-success" onClick={handleSend} >Send $</button>
                    <button className="form-control mt-2 bg-danger" onClick={handleRequest} >Request $</button>

                </form>}
            {type === 'contact' &&
                <form>
                    <button
                        style={{
                            position: "absolute",
                            top: '.5rem',
                            right: '.5rem'
                        }}
                        onClick={() => setMode({ ...mode, display: 'none', type: '' })}
                    >X</button>
                    <label className="form-label d-block" htmlFor='search'>Add Contact</label>
                    <input
                        type='text'
                        id='search'
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder='Enter Username...'
                    />
                    {friend && <div key={friend._id} className='p-2 mt-2 text-center border border-success rounded'>
                        <img
                            className="postimg"
                            src={`/stock/${friend.image}.png`}
                            alt='stock profile'
                            width="40"
                            height="40"
                            style={{
                                borderRadius: "50%",
                            }}
                        />
                        <span style={{
                            padding: '0 2rem 0 2rem'
                        }}>{friend.username}</span>
                        <button
                            className=" bg-success text-light rounded"
                            onClick={sendFriendRequest}>Add</button>
                    </div>}

                    {currentUser.contacts && <div className="
                    container text-center mt-4 border-top border-dark">
                        <p className="display-6 text-dark">Contacts:</p>
                        {currentUser.contacts.map((c, i) => {
                            return currentUser.id === c.sendingUser._id ? 
                            // Current User Sent Request
                            <div key={i} className='p-1 mt-2 border border-success rounded row'>
                                {c.pending && <span className='col-6'>Sent to: {`[cancel request]`}</span>}
                                <span className='col-3'>
                                    <img
                                        className="postimg"
                                        src={`/stock/${c.recievingUser.image}.png`}
                                        alt='stock profile'
                                        width="40"
                                        height="40"
                                        style={{
                                            borderRadius: "50%",
                                        }}
                                    />
                                </span>
                                <span className="col-3">{c.recievingUser.username}</span>
                            </div> : 
                            // Current User Recieved Request
                            <div key={i} className='p-1 mt-2 border border-success rounded row'>
                                {c.pending && <span className='col'>Request from:</span>}
                                <span className='col'>
                                <img
                                    className="postimg"
                                    src={`/stock/${c.sendingUser.image}.png`}
                                    alt='stock profile'
                                    width="40"
                                    height="40"
                                    style={{
                                        borderRadius: "50%",
                                    }}
                                />
                                </span>
                                
                                <span className='col'>{c.sendingUser.username}</span>
                                {c.pending && <>Accept / Decline</>}
                            </div>
                        })}
                    </div>}
                </form>}
        </div>
    )
}

export default Modal