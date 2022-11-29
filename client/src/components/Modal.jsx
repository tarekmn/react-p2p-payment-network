import { useState } from "react"

const Modal = ({ mode, setMode, currentUser }) => {
    const { type, display } = mode

    // get all contacts for contacts modal and pay modal
    // const contacts = await fetch('...')
    const contacts = [
        { _id: 0, username: 'Ted' },
        { _id: 1, username: 'James' },
        { _id: 2, username: 'Sherry' },
        { _id: 3, username: 'Bob Jones' }
    ]

    const [transaction, setTransaction] = useState({
        sendingUser: currentUser.id,
        recievingUser: '',
        amount: '',
        transactionText: '',
        type: ''
    })

    const handleSend = async e => {
        e.preventDefault()
        setTransaction({ ...transaction, type: 'sending-credit' })
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
        setTransaction({ ...transaction, type: 'sending-debit' })
        const r = await fetch('/ap/transaction/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        })
        console.log(r)
        if (r.ok) {
            // reload homepage
        }
    }


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
                        {contacts.map(c =>
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
                    Add new contact
                    View or Delete Existing contacts
                </form>}
        </div>
    )
}

export default Modal