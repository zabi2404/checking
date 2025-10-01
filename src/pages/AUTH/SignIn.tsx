import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userslice.ts'
import Oauth from "../../components/Buttons/Oauth.tsx";
import { toast } from "react-toastify";

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state: any) => state.user)

  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  // STORING FORM DATA 
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  // API CALL TO SIGN IN  ON SUBMIT BUTTON
  const formSubmmission = (e: React.FormEvent<HTMLFormElement>) => {

    dispatch(signInStart());
    e.preventDefault();

    // API CALL TO SIGN IN 
    axios.post(`/api/auth/signin`, formData)
      .then((response) => {
        const data = response.data

        dispatch(signInSuccess(data))
        navigate('/')
        setformData({
          email: '',
          password: ''
        })
        
      })
      .catch((error) => {

        if (error.response) {
          dispatch(signInFailure(error.response.data.message));
          // Backend responded with an error status code (like 400, 500)

          toast.error(error.response.data.message || "Login failed ");
        } else {
          // Some other error (network, CORS, etc.)
          toast.error("Network error, please try again ");
        }

      });


  }

  return (
    <>
      <div className="  xxsm:p-2">

        {/* TITLE */}
        <div className="text-center font-bold mb-4 text-2xl">
          <h1>Sign In</h1>
        </div>

        {/* FORM */}
        <div className=" ">
          <form action="submit" onSubmit={formSubmmission} className="flex flex-col gap-4 items-center ">
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={HandleChange}
              placeholder="Email"
              className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]"
              required
            />
            {/* PASSWORD */}
            <input className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]"
              type="password"
              name="password"
              value={formData.password}
              onChange={HandleChange}
              placeholder="Password"
              required />

            {/* FORM LOWER PART */}
            <div className="flex flex-col justify-center items-center mt-4 w-full">

              {/* SIGN IN BUTTON */}
              <button disabled={loading} className="cursor-pointer w-full  max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] flex justify-center items-center text-white outline-none disabled:opacity-50"
                type="submit">
                Sign In
              </button>

              {/* GOOGLE AUTH BUTTON */}
              <div className="w-full mt-4 flex flex-col justify-center items-center" >
                <Oauth />
              </div>

              <div className="flex justify-start gap-2 mt-4">
                <p>Doesn't have an account? </p>
                <Link to="/signup">   <span className="text-blue-600 ">Sign Up</span></Link>
              </div>
            </div>

          </form>


        </div>

      </div>
    </>
  )
}
