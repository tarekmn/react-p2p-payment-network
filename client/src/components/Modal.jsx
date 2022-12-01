import { useEffect } from "react"
import { useState } from "react"
import Button from 'react-bootstrap/Button'

const Modal = ({ mode, setMode, currentUser, setCurrentUser }) => {
    const { type, display } = mode

    const [contact, setContact] = useState('')
    const [friend, setFriend] = useState(null)

    const [transaction, setTransaction] = useState({
        recievingUser: '',
        text: '',
        amount: ''
    })

    const handleSend = async e => {
        e.preventDefault()
        if (transaction.recievingUser === 'x' || !transaction.recievingUser) {
            alert('Please Choose a Contact')
            return
        }
        if (!transaction.amount || transaction.amount === 0 || transaction.amount > currentUser.balance) {
            alert('Please enter number between 0 and your balance.')
            return
        }
        if (!transaction.text) {
            alert('Please fill out text field.')
            return
        }
        const r = await fetch('/api/transaction/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                transactionText: transaction.text,
                creditUser: transaction.recievingUser,
                debitUser: currentUser.id,
                amount: transaction.amount
            })
        })

        if (r.ok) {
            const t = currentUser.transactions.map(t => t)
            t.push(await r.json())
            setCurrentUser({...currentUser, transactions: t, balance: t[t.length - 1].debitUser.balance})
        }
    }

    // const handleRequest = async e => {
    //     e.preventDefault()
    //     setTransaction({ ...transaction, sendingUser: '' })
    //     await fetch('/ap/transaction/', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(transaction)
    //     })
    // }

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
        setCurrentUser({ ...currentUser, contacts: data.contacts })
        setFriend(null)
    }

    const acceptRequest = async e => {
        e.preventDefault()
        const res = await fetch(`/api/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contactId: e.target.id
            })
        })
        const data = await res.json()
        const contacts = currentUser.contacts.map(c => c._id === data._id ? { ...c, pending: false } : c)
        setCurrentUser({ ...currentUser, contacts: contacts })
    }

    const cancelRequest = async (e) => {
        e.preventDefault()
        console.log(e.target.id)
        const res = await fetch(`/api/contact/${e.target.id}`, {
            method: 'DELETE'
        })
        const data = await res.json()
        console.log(currentUser.contacts)
        const contacts = currentUser.contacts.filter(c => c._id !== e.target.id)
        console.log(contacts)
        setCurrentUser({ ...currentUser, contacts: contacts })
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
                width: '95%',
                height: 'auto',
                margin: '0 auto 0 auto',
                right: '0',
                left: '0',
                padding: '1rem'
            }}>
            {type === 'pay' &&
                <form className="container" >
                    <Button
                        style={{
                            position: "absolute",
                            top: '.5rem',
                            right: '.5rem'
                        }}
                        className='bg-danger text-dark'
                        onClick={() => setMode({ ...mode, display: 'none', type: '' })}
                    >X</Button>

                    <label className="form-label" htmlFor='who'>Choose Contact</label>
                    <select id='who'
                        className="form-control"
                        value={transaction.recievingUser}
                        onChange={(e) => {
                            setTransaction({ ...transaction, recievingUser: e.target.value })
                        }}
                        required
                    >
                        <option value={'x'}>Choose Contact</option>
                        {currentUser.contacts.map((c, i) => {
                            if (!c.pending) {
                                const x = c.sendingUser.id === currentUser.id ? <option key={i} value={c.recievingUser.id}>{c.recievingUser.username}</option> : <option key={i} value={c.sendingUser.id}>{c.sendingUser.username}</option>
                                return x
                            }
                        })}

                    </select>

                    <label className="form-label" htmlFor='for'>What's it for?</label>
                    <input 
                    className="form-control" 
                    id='for' 
                    value={transaction.text} 
                    onChange={e => setTransaction({ ...transaction, text: e.target.value })} 
                    maxLength={20}
                    />

                    <label className="form-label" htmlFor='amount'>How Much? {`(Balance: ${currentUser.balance})`}</label>
                    <input className='form-control' id='amount' type='number' value={transaction.amount} max={`${currentUser.balance}`} min='0' onChange={e => setTransaction({ ...transaction, amount: e.target.value })} />

                    <Button className="form-control mt-2 bg-success" onClick={handleSend} >Send $</Button>
                    {/* <Button className="form-control mt-2 bg-danger" onClick={handleRequest} >Request $</Button> */}

                </form>}
            {type === 'contact' &&
                <form>
                    <Button
                        style={{
                            position: "absolute",
                            top: '.5rem',
                            right: '.5rem'
                        }}
                        className='bg-danger text-dark'
                        onClick={() => setMode({ ...mode, display: 'none', type: '' })}
                    >X</Button>
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
                        <Button
                            className=" bg-success text-light rounded"
                            onClick={sendFriendRequest}>Add</Button>
                    </div>}

                    {currentUser.contacts && <div className="
                    container mt-4 border-top border-dark">
                        <p className="display-6 text-dark">Contacts:</p>
                        {currentUser.contacts.map((c, i) => {
                            return currentUser.id === c.sendingUser._id ?
                                // Current User Sent Request
                                <div key={i} className='p-1 mt-2 border border-success rounded row justify-around'>
                                    {c.pending && <span className='col'>Sent to:</span>}
                                    <span className='col'>
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
                                        <span>{c.recievingUser.username}</span>
                                    </span>
                                    {c.pending && <Button
                                        id={c._id}
                                        onClick={cancelRequest}
                                        className='bg-danger col'
                                    >Cancel</Button>}
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
                                    {c.pending && <><Button id={c._id} onClick={acceptRequest}>Accept</Button> / <Button id={c._id} onClick={cancelRequest}>Decline</Button></>}
                                </div>
                        })}
                    </div>}
                </form>}
        </div>
    )
}

export default Modal