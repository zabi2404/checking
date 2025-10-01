

import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";



export default function Input() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const HandleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); // getting the url 
    urlParams.set('searchTerm', search);  // inserting string into queryparam searchTerm
    const searchQuery = urlParams.toString(); // getting back the url and converting into string  
    navigate(`/search?${searchQuery}`) //. navigate to that specific url

  }
 

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search) // getting the url 
    const searchTermFormUrl = urlParams.get('searchTerm') //gettign speciic query param 
    if (searchTermFormUrl) {

      setSearch(searchTermFormUrl)    // if that specific queryparam exist add that value in to input
    }
  }, [location.search]);

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className='flex items-center justify-between  bg-[#F1F5F9] p-3 rounded-[8px] 
    md:min-w-[400px]
    xsm:min-w-full
    
    '   >
          <input  className='w-full outline-none' type="text" placeholder='Search...' value={search}
            onChange={(event) => { setSearch(event.target.value)

              
            }}
          />
          <button type="submit" ><IoIosSearch /></button>

        </div>
      </form>
    </>
  )
}
