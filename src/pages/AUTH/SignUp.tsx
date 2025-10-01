import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Oauth from "../../components/Buttons/Oauth";


export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }

  const formSubmmission = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios.post('/api/auth/signup', formData)
      .then((response) => {
        const data = response

        console.log(data)
        
        console.log("form subbmitted");
        
        setLoading(false);
        navigate('/signin')
        setformData({
          username: '',
          email: '',
          password: ''
        })

      })
      .catch((error) => {

        if (error.response) {
          setLoading(false);
          setError(error.response.data.message);
          // Backend responded with an error status code (like 400, 500)
          console.log(error.response.data.message)
          console.log(error.response.data.statusCode)

        } else {
          // Some other error (network, CORS, etc.)
          console.log(error.message);
        }

      });
  }

  return (
    <>
      <div className="  xxsm:p-2">

        <div className="text-center font-bold mb-4 text-2xl">
          <h1>Sign Up</h1>
        </div>

        <div className=" ">
          <form action="submit" onSubmit={formSubmmission} className="flex flex-col gap-4 items-center ">
            <input className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]" type="text" name="username" value={formData.username} onChange={HandleChange} placeholder="Username" required />
            <input className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]" type="email" name="email" value={formData.email} onChange={HandleChange} placeholder="Email" required />
            <input className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]" type="password" name="password" value={formData.password} onChange={HandleChange} placeholder="Password" autoComplete="off"  required />

            <div className="flex flex-col justify-center items-center mt-4 w-full">
              <div className="w-full  max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] flex justify-center items-center">
                <button disabled={loading} className="cursor-pointer text-white outline-none disabled:opacity-50" type="submit">
                  sign Up
                </button>
              </div>
                <div className="w-full mt-4 flex flex-col justify-center items-center">
              <Oauth/>
                </div>
              <div className="flex justify-start gap-2 mt-4">
                <p>Have an account? </p>
              <Link to="/signin">  <span className="text-blue-600">Sign in</span></Link>
              </div>
            </div>
          </form>


        </div>

        {loading &&
          <div className="flex justify-center mt-4 text-red-600"> {/* use toast to notify*/}
            <p>
              {error}
            </p>
          </div>
        }


      </div>
    </>
  )
}
