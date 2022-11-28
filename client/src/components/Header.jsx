

const Header = () => {
    const fetchUser = async () => {
        const query = await fetch('')
        const data = await query.json()
        console.log(data)
        
    }
    
    useEffect(()=>{
        fetchUser()
    },[])
    

    return(
        <header style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{margin:'10px auto',borderRadius: '50%',width:'150px',background: '#BADA55', border:'5px outset orange'}}>
                <p style={{ }}>Balance</p>
            </div>
            <div style={{margin:'10px auto',width:'150px',background: '#BADA55',border:'5px outset orange'}}>
                <p>Welcome user</p>
            </div>
        </header>
    )
}

export default Header