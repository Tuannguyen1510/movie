import React from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

  const { isLoading } = useSelector(state => state.LoadingReducer)





  return (
    <>
{isLoading ? 
  <div class="" style={{
        position: 'fixed',
        top: 0,
        lef: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>

        Loading
      </div> : ''


}



      



    </>

  )
}
