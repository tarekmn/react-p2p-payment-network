import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect,  } from 'react'

const Feed = () => {
    
    // const [tran, setTran] = useState

    // const getTran = async () => {
    //     const query = await fetch(`/api/transaction/`, {
    //         method: 'GET'
    //     })
    //         const response = await query.json()
    //         setTran(response)
    //     }
    
    
    // useEffect(() => {
    //     getTran()
        
    // }, [])

    const dummy = [
        {
          id:'1',
          title:'Terek paid joe 30$',
        },
        {
          id:'2',
          title:'terek paid ivan 50$'
        },
        {
          id:'3',
          title:'yooooooooooooooooooooooo'
        },
        {
          id:'4',
          title:'yo4'
        },
        {
          id:'5',
          title:'yo4'
        },
        {
          id:'6',
          title:'yo4'
        },
        
    ]

    return(
    <>
        <div id="scrollableDiv" style={{ height: 130, overflow: "auto",}}>
            <InfiniteScroll
                dataLength={dummy.length}
                next={dummy}
                scrollableTarget="scrollableDiv"
                
            >
            {dummy.map(item => (
                <div key={item.id}>
                    <div style={{outline:'1px solid black'}}>
                        {item.title}
                    </div>
                </div>
            ))}
            </InfiniteScroll>
        </div>
    </>
    )
}

export default Feed  