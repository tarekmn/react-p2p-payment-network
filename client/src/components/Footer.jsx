const Footer = ({ mode, setMode }) => {
  return (
    <footer style={{
      justifyContent: 'center',
      display: 'flex',
    }}>
      <a href='/feed'>
        <button style={{
          borderColor: '#59C738',
          borderRadius: '5px',
          padding: '10px',
          margin: '25px',
        }}>
          Feed
        </button>
      </a>

      <button style={{

        borderColor: 'green',
        borderRadius: 100,
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#59C738',
      }}
        onClick={e => setMode({ ...mode, display: 'block', type: 'pay' })}
      >
        Pay
      </button>

      <button style={{
        borderColor: '#59C738',
        borderRadius: '5px',
        padding: '10px',
        margin: '25px',
      }}
        onClick={e => setMode({ ...mode, display: 'block', type: 'contact' })}
      >
        Contacts
      </button>

    </footer>
  )
}

export default Footer