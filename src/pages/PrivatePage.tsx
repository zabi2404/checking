import { Outlet, Navigate } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux';


export default function PrivatePage() {
    
    const { currentUser } = useSelector((state: any) => state.user)

  return (
   <>
   { currentUser? <Outlet/> : <Navigate to="/signIn"/>}
   </>
  )
}
