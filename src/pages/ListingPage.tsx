
import axios from 'axios';
import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { FaSquareParking } from "react-icons/fa6";
import { FaChair } from "react-icons/fa";
import { useSelector } from 'react-redux';
import MessageButton from '../components/MessageButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination } from "swiper/modules";




export default function ListingPage() {

    const { currentUser } = useSelector((state: any) => state.user)
    const param = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sendMessage, setSendMessage] = useState(false)
    console.log(sendMessage)

    type Listing = {
        name?: string;
        regularPrice?: number
        discountedPrice?: number,
        address?: string,
        offer?: boolean,
        furnished?: boolean,
        bathroom?: number;
        bedroom?: number;
        description?: string,
        parking?: boolean,
        type?: string,
        userRef?: string
        ImageUrl:string[];


    };

    const [form, setForm] = useState<Listing | null>(null);

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/listing/get/${param.id}`)
            .then((response) => {

                setForm(response.data)
                console.log("form: ", form)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message);
                console.log(err)
            })
    }, []);

    const secondhalf = form?.name ? form.name.slice(1, form.name.length).toLowerCase() : "";
    let name = form?.name ? form.name.slice(0, 1).toUpperCase() : "";
    name = name + secondhalf;

    const discount = (form?.regularPrice ?? 0) - (form?.discountedPrice ?? 0);

    console.log(
        (discount)
    )

    return (

        <>

            {loading &&
                <p className='flex justify-center h-screen items-center text-4xl font-bold'>Loadind...</p>
            }
            {
                error &&
                <p className='flex justify-center h-screen items-center text-4xl font-bold'>404 Listing Not Found</p>
            }

            {
                !loading && !error &&
                <div>
                    <div className=" w-full">

                        <Swiper spaceBetween={10} slidesPerView={1} navigation modules={[Navigation]}>
                            {form?.ImageUrl?.map((url, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={url}
                                        alt={`listing-${index}`}
                                        className="h-[400px] w-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className='mx-auto w-[600px] mt-16'>
                        <div className='my-4'>
                            {
                            }
                            <p className='text-3xl font-bold'>{name} - $ {form?.regularPrice}</p>
                        </div>
                        <div className='my-2'>
                            <p className='flex gap-2 items-center'><IoLocationOutline />
                                {form?.address}</p>
                        </div>
                        <div>
                            <div className='flex gap-4 my-4'>
                                <p className='py-2 px-15 rounded-[6px] bg-red-800 text-white w-fit'> For {form?.type !== "sell" ? "Rent" : "Sale"}</p>
                                {form.offer &&

                                    <p className='py-2 px-15 rounded-[6px] bg-green-900 text-white w-fit'> {discount}$ discount</p>
                                }
                            </div>
                            <div className='my-4'>
                                <p> <span className="font-bold">Description - </span>{form?.description}</p>
                            </div>
                            <div className='my-4'>
                                <ul className='flex flex-wrap gap-4'>
                                    <li className='flex items-center gap-2'>
                                    <FaBed /> {form?.bedroom ?? 0} {form?.bedroom && form.bedroom > 1 ? "beds" : "bed"}
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <FaBath />{form?.bathroom} {form?.bathroom! > 1 ? "bathrooms" : "bathroom"}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaSquareParking />{form?.parking ? "Parking Available" : "No Parking"}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaChair />{form?.furnished ? "Furnished" : "Unfurnished"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {currentUser && (currentUser._id !== form.userRef) && !sendMessage &&
                            <div className="w-full mt-4 max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] flex justify-center items-center">
                                <button onClick={() => { setSendMessage(true) }} className="cursor-pointer uppercase text-white outline-none ">
                                    contact Landlord
                                </button>
                            </div>
                        }
                        {
                            sendMessage && form &&
                            <MessageButton
                                form={form}
                            />
                        }


                    </div>
                </div >

            }


        </>

    )
}
