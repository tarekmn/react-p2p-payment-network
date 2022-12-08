import { MdAttachMoney } from 'react-icons/md'

const Footer = ({ mode, setMode }) => {
  return (
    <footer style={{
      justifyContent: 'center',
      display: 'flex',
    }}>
      <a href='/feed'>
        <button style={{
          borderColor: 'black',
          borderRadius: '.5rem',
          padding: '10px',
          margin: '25px',
        }}>
          Feed
        </button>
      </a>


      <button style={{

        borderColor: 'black',
        borderRadius: 100,
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'black',
      }}
        onClick={e => setMode({ ...mode, display: 'block', type: 'pay' })}
      >
        <MdAttachMoney 
        style={{
          width: '3.5rem',
          height: 'auto',
          color: '#2cff0f'
        }}
        />
      </button>

      <button style={{
        borderColor: 'black',
        borderRadius: '.5rem',
        padding: '10px',
        margin: '25px',
      }}
        onClick={e => setMode({ ...mode, display: 'block', type: 'contact' })}
      >
        Contacts
      </button>


    </footer>
  );
};

export default Footer;
