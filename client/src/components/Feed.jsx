import InfiniteScroll from "react-infinite-scroll-component"
const Feed = ({ currentUser, setCurrentUser }) => {

  const handleCancelRequest = async (e, id) => {
    e.preventDefault()
    const r = await fetch(`/api/transaction/${id}`, {method:'DELETE'})
    if (r.ok) {
      const t = currentUser.transactions.filter(t => t._id !== id)
      setCurrentUser({
        ...currentUser,
        transactions: t
      })
    }
  }

  const handleAccept = async (e, id, amount) => {
    if (currentUser.balance < amount) {
      return
    }
    const r = await fetch(`api/transaction/${id}`)
    const {transaction, balance} = await r.json()
    console.log(transaction, balance)
    const t = currentUser.transactions.map(t => {
      if (t._id === transaction._id) { t.pending = false }
      return t
    })
    setCurrentUser({
      ...currentUser,
      transactions: t,
      balance: balance
    })
  }

  const handleDecline = async (e, id) => {
    const r = await fetch(`api/transaction/${id}`, {
      method: 'DELETE'
    })
    if (r.ok) {
      const t = currentUser.transactions.filter(t => t._id !== id)
      setCurrentUser({
        ...currentUser,
        transactions: t
      })
    }
  }

  return (
    <>
      <div id="scrollableDiv" style={{ overflow: "auto", margin: "0 auto" }}>
        <InfiniteScroll
          dataLength={currentUser.transactions.length}
          next={currentUser.transactions}
          scrollableTarget="scrollableDiv"
          style={{
            margin: 5,
            padding: ".5rem 0 0 0",
          }}
        >
          {currentUser.transactions &&
            currentUser.transactions.map((t, i) => {
              const tstyle =
                t.creditUser._id === currentUser.id
                  ? { backgroundColor: "#00E661" }
                  : { backgroundColor: "#CA2B29" }
              return (
                <div
                  key={i}
                  className="border border-dark rounded mb-2 text-dark p-1"
                  style={tstyle}
                >
                  <img
                    className="postimg"
                    src={`/stock/${t.creditUser._id === currentUser.id ? t.debitUser.image : t.creditUser.image}.png`}
                    width="35"
                    height="35"
                    alt="stock profile"
                    style={{
                      borderRadius: "50%",
                      margin: 4,
                    }}
                  />
                  {t.pending ?
                    (<>
                      {t.debitUser._id === currentUser.id ?
                        (<>
                          {t.creditUser.username} requested ${t.amount} for {t.transactionText}.
                          <button onClick={e => handleAccept(e, t._id, t.amount)}>Accept</button>
                          <button onClick={e => handleDecline(e, t._id)}>Decline</button>
                        </>) : (<>
                          You requested ${t.amount} from {t.debitUser.username} for {t.transactionText}.
                          <button onClick={e => handleCancelRequest(e, t._id)}>Cancel</button>
                        </>)}
                    </>) :
                    (<>
                      {t.creditUser._id === currentUser.id ?
                        (<>
                        {t.debitUser.username} sent you ${t.amount} for {t.transactionText}.
                        </>) :
                        (<>
                        You sent {t.creditUser.username} ${t.amount} for {t.transactionText}.
                        </>)}
                    </>)}
                </div>
              )
            })}
        </InfiniteScroll>
      </div>
    </>
  )
}
export default Feed
