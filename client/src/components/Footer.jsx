


const Footer = () => {
  return (
    <footer style={{
      justifyContent: 'center',
      display: 'flex',
    }}>
     
        <button style={{
          borderColor: '#59C738',
          borderRadius: '5px',
          padding: '10px',
          margin: '25px',
        }}>
          Feed
        </button>

        <button style = {{
          
          borderColor: 'green',
          borderRadius: 100,
          alignItems: 'center',
          width: 100,
          height: 100,
          backgroundColor: '#59C738',
        }}>
          Pay
        </button>

        <button style = {{
          borderColor: '#59C738',
          borderRadius: '5px',
          padding: '10px',
          margin: '25px',
        }}>
          Contacts
        </button>
       
    </footer>
  )
}

export default Footer