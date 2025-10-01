import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Listing from '../sections/Profile/Listing.tsx';
import { toast } from 'react-toastify';

//reduxx
import { useDispatch, useSelector } from 'react-redux';
import {
  UpdateUserFailure
  , UpdateUserSuccess
  , UpdateUserStart
  , DeleteUserStart
  , DeleteUserSuccess
  , DeleteUserFailure
  , signOutUserStart
  , signOutUserSuccess
  , signOutUserFailure
} from '../redux/user/userslice.ts'



export default function Profile() {

  const [file, setFile] = useState<File | undefined>(undefined)
  const [url, setUrl] = useState("");
  const imageUpload = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({});
  const [listing, setListing] = useState<ListingType[]>([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user)

  console.log(listing);
  type ListingType = {
    _id: string;
    name: string;
    ImageUrl: string[]
  };


  // FORM DATA 
  const HandleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  }


  // API CALL to updating user information 
  const FormSubmmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdateUserStart());

    axios.post(`/api/user/update/${currentUser._id}`, formData).then((response) => {
      const data = response.data
      dispatch(UpdateUserSuccess(data))
      toast.success("Updated")

    })
      .catch((error) => {
        if (error.response) {
          dispatch(UpdateUserFailure(error.response.data.message));
          // Backend responded with an error status code (like 400, 500)
          toast.error(error.response.data.message || "Login failed ");


        } else {
          // Some other error (network, CORS, etc.)
          toast.error("Network error, please try again ");
        }
      })

  }

  // API CALL TO DELETE ACC 
  const DeleteAccount = () => {
    dispatch(DeleteUserStart())
    axios.delete(`/api/user/delete/${currentUser._id}`)
      .then((response) => {
        const data = response.data
        console.log(data);
        dispatch(DeleteUserSuccess())
      })
      .catch((error) => {
        dispatch(DeleteUserFailure(error))
      })
  }

  // API CALL TO DELETE LISTING
  const DeletingListing = (id: string) => {
    console.log(id)
    axios.delete(`api/listing/delete/${id}`)
      .then((res) => {

        { console.log(res) }
        setListing((prev) => prev.filter((listing) => listing._id !== id))
      }

      )
      .catch((err) => console.log(err.response.data.message))
  }

  // API CALL TO SIGNOUT PERSON
  const SignOut = () => {
    dispatch(signOutUserStart());
    axios.get(`api/user/signout`)

      .then((response) => {
        console.log(response.data)
        dispatch(signOutUserSuccess())
      })
      .catch((err) => {
        dispatch(signOutUserFailure(err))

      })
  }

  // IMAGE CHANGING
  useEffect(() => {

    if (file) {
      handleUpload(file);
      console.log(file)
    }
  }, [file]);

  //saving file and calculating the percentage of the file uploading
  const handleUpload = async (file: File) => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "imageSaver"); // Your unsigned preset
    data.append("cloud_name", "dzzgnxp6e"); // Your cloud name

    // UPLOADING IMAGE ON CLOUD
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzzgnxp6e/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!
              );
           
            }
          },
        }
      );

      const imageUrl = res.data.secure_url;
      setUrl(imageUrl);
      setFormData({
        ...formData,
        avatar: imageUrl
      });

    } catch (err) {
      console.error(err);
    }


  };


  //API CALL TO SHOW LISTING
  const ShowListing = () => {
    setLoading(true);
    axios.get(`/api/user/listings/${currentUser._id}`)
      .then((response) => {
        setLoading(false)
        setListing(response.data);
        console.log(response.data)
      })
      .catch((err) => { console.log(err.message), setLoading(false) })
  }

  return (
    <>
      <div className='text-center
      xsm:p-2
      '>

        {/* TITLE */}
        <div>
          <h1 className='font-bold text-2xl mt-8'>
            Profile
          </h1>
        </div>

        {/* FORM TO UPDATE USER INFO */}
        <form className="flex flex-col gap-4 items-center " onSubmit={FormSubmmission}>

          <input type="file" ref={imageUpload} hidden accept='image/.*'
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.files && input.files[0]) {
                setFile(input.files[0]);
              }
            }}
          />
          <img src={currentUser ? currentUser.avatar : url} onClick={() => imageUpload.current && imageUpload.current.click()} className='w-20 h-20 rounded-full object-cover cursor-pointer mt-2' alt="" />
          <input className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]" type="text" defaultValue={currentUser.username} name="username" placeholder="Username" required onChange={HandleFormData} />
          <input className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]" type="email" defaultValue={currentUser.email} name="email" placeholder="Email" required onChange={HandleFormData} />
          <input className="p-4 outline-none border bg-white border-gray-600 rounded-[6px] w-full max-w-[450px] min-w-[300px]" type="password" name="password" placeholder="Password" onChange={HandleFormData} />
          <button type='submit' className='disabled:opacity-60 w-full mt-4 max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] text-white cursor-pointer'
          >update</button>

          <button type='button' className='disabled:opacity-60 w-full mt-4 max-w-[450px] min-w-[300px] bg-green-700 p-4 rounded-[6px] text-white cursor-pointer'
          > <Link to="/create-listing">Create Listing</Link></button>
        </form>

        {/* SIGN OUT AND DELETE BUTTON */}
        <div className='flex justify-center sm:gap-68 mt-4 text-red-700
        xsm:gap-30
        '>
          <p onClick={DeleteAccount} className='cursor-pointer'> Delete Account</p>
          <p onClick={SignOut} className='cursor-pointer'>
            Sign Out
          </p>

        </div>

        {/* SHOW LISTING  */}
        <div className='text-green-600 text-center '>
          <button onClick={ShowListing} className='cursor-pointer hover:underline'>show Listing</button>

          {
            listing && listing.length > 0 &&

            <div>
              <h1 className="text-center font-bold text-2xl my-4 text-black">Your Listing</h1>
              {loading ? (
                "Loading....."
              ) : (
                listing.map((item) => (
                  <Listing
                    DeletingListing={DeletingListing}
                    key={item._id}
                    id={item._id}
                    title={item.name}
                    image={item.ImageUrl[0]}
                  />
                ))
              )}
            </div>
          }
        </div>

      </div>
    </>
  )
}
