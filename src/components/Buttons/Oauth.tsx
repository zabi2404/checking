import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../../firsbase';
import axios from "axios";
import { signInSuccess } from "../../redux/user/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Oauth() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log(result)

            const { displayName, email, photoURL } = result.user;
            axios.post('/api/auth/google', { username: displayName, email, photoURL })
                .then((response) => {
                    dispatch(signInSuccess(response.data))
                    console.log(response.status)
                    Navigate('/')
                })
                .catch((error) => {
                    console.log(error.response.data.message)
                })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <button onClick={handleGoogleClick} type='button' className="text-white bg-red-700 w-full  max-w-[450px] min-w-[300px]  p-4 rounded-[6px] flex justify-center items-center cursor-pointer">
            Continue with Google
        </button>
    )
}
