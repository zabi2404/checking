import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


type FormType = {
    userRef: string;
    name: string;
};

type MessageButtonProps = {
    form: FormType;
};

export default function MessageButton({ form }: MessageButtonProps) {

const [message,setMessage]=useState("");

const HandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
   
}
    type LandlordType = {
        username: string;
        email: string;
        // add other properties if needed
    };

    const [Landlord, setLandlord] = useState<LandlordType | null>(null);

    useEffect(() => {
        console.log(form?.userRef)
        axios.get(`/api/user/${form?.userRef}`)
            .then((response) => {
              
                setLandlord(response.data)
            })
            .catch((err) => { console.log(err) })
    }, [form.userRef]);


    return (
        <>
            <div>
                {Landlord &&

                    <div className='w-full'>
                        <p>Contact at <span className='font-bold'>
                            {Landlord.username} {" "}
                        </span>
                            for <span className='font-bold'>{form.name}</span>
                        </p>
                        <textarea
                            className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]"
                            name="description"
                            id=""
                            rows={3}
                            onChange={HandleChange}
                            
                        />
                        <div className='text-white w-full mt-4 max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] flex justify-center items-center'>

                        <Link to={`mailto:${Landlord.email}?subject=Regarding ${form.name}&body=${message}`}>
                            Send Message
                        </Link>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
