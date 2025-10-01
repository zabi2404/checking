import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function updateListing() {


    const [file, setFile] = useState<File[]>([]);
    const { currentUser } = useSelector((state: any) => state.user)
    const [Error, setError] = useState("");
    const [loading, Setloadind] = useState(false)
    const [progress, setProgress] = useState<number>(0);

    type FormDataType = {
        name: string;
        description: string;
        address: string;
        type: string;
        regularPrice: number;
        discountedPrice: number;
        bathroom: number;
        bedroom: number;
        furnished: boolean;
        parking: boolean;
        offer: boolean;
        ImageUrl: string[];
    }

    const Navigate = useNavigate();
    const { id } = useParams();
    const [formData, setformData] = useState<FormDataType>({
        name: '',
        description: '',
        address: '',
        type: 'sell',
        regularPrice: 0,
        discountedPrice: 0,
        bathroom: 1,
        bedroom: 1,
        furnished: false,
        parking: false,
        offer: false,
        ImageUrl: [],

    });


    console.log(formData)
    console.log(file)

    useEffect(() => {
        console.log(id)
        axios.get(`/api/listing/get/${id}`)
            .then((res) => {
                const data = res.data;
                setformData(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })


    }, []);




    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        if (e.target.name === "sell" || e.target.name === "rent") {

            setformData({
                ...formData,
                type: e.target.name
            })

        }

        if (e.target.type === "text" || e.target.name === "description") {

            setformData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === "parking" || e.target.name === "furnished" || e.target.name === "offer") {
            if (e.target instanceof HTMLInputElement) {
                setformData(
                    {
                        ...formData,
                        [e.target.name]: e.target.checked
                    })
            }
        }
    }


    const formSubbmission = (e: React.ChangeEvent<HTMLFormElement>) => {

        e.preventDefault();
        Setloadind(true);

        axios.put(`/api/listing/update/${id}`,
            { ...formData, userRef: currentUser._id })
            .then((response) => {
                console.log(response.data, response.status);
                Setloadind(false);
                Navigate(`/listing/${response.data._id}`)
            })
            .catch(err => {
                console.log(err.response.data.message, "my error");
                console.log(err.message)
                setError(err.message)
                Setloadind(false);
            })


    }


    // uploading images
    const handleUploadImage = async (files: File[]) => {
        if (!file.length) {
            alert("Please select at least one file.");
            return;
        }

        try {
            const uploadedUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const data = new FormData();
                data.append("file", files[i]);
                data.append("upload_preset", "imageSaver");
                data.append("cloud_name", "dzzgnxp6e");

                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/dzzgnxp6e/image/upload",
                    data,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.total) {
                                const percent = Math.round(
                                    (progressEvent.loaded * 100) / progressEvent.total
                                );
                                setProgress(percent);
                            }
                        },
                    }
                );

                uploadedUrls.push(res.data.secure_url);
            }
            console.log(uploadedUrls)
            toast.success("images uploaded")
            // Merge with existing avatar array
            setformData((prev) => ({
                ...prev,
                ImageUrl: [...prev.ImageUrl, ...uploadedUrls],
            }));

            setProgress(0);
            console.log("All done")
        } catch (err) {
            console.error("Upload error:", err);
            setProgress(0);
        }
    };

    return (
        <>
            <div>
                <div className="mt-8"><h1 className="font-black text-2xl text-center">Update a Listing</h1></div>
                <form onSubmit={formSubbmission} className=" flex justify-center item-center w-full gap-4 mt-8 md:flex-row
                xsm:flex-col xsm:p-3 
                ">
                    {/* first part of form */}
                    <div className="max-w-[400px]">
                        {/* input fields for details */}
                        <div className="flex flex-col gap-4">
                            <input
                                className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]"
                                type="text"
                                name="name"
                                placeholder="Name"
                                maxLength={32}
                                minLength={5}
                                required
                                onChange={HandleChange}
                                value={formData.name}
                            />
                            <textarea
                                className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]"
                                name="description"
                                id=""
                                rows={3}
                                onChange={HandleChange}
                                value={formData.description}
                            />
                            <input
                                className="p-4 outline-none border bg-white  border-gray-600 rounded-[6px] w-full  max-w-[450px] min-w-[300px]"
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                onChange={HandleChange}
                                value={formData.address}
                            />
                        </div>
                        {/* checkboxes booolean */}
                        <div className="flex flex-wrap gap-2 my-4">

                            <div className="flex gap-2">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    name="sell"
                                    onChange={HandleChange}
                                    checked={formData.type === "sell"}
                                />
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="rent"
                                    className="w-5"
                                    onChange={HandleChange}
                                    checked={formData.type === "rent"} />
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="parking"
                                    className="w-5"
                                    onChange={HandleChange}
                                    checked={formData.parking}
                                />
                                <span>Parking Spot</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="furnished"
                                    className="w-5"
                                    onChange={HandleChange}
                                    checked={formData.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="offer"
                                    className="w-5"
                                    onChange={HandleChange}
                                    checked={formData.offer} />
                                <span>Offer</span>
                            </div>

                        </div>

                        {/* last section of firrst part of form */}
                        <div className="flex flex-wrap gap-4 mt-4">

                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="bedroom"
                                    max={10}
                                    min={1}

                                    className="p-3 bg-white rounded-[4px] border border-gray-500"
                                    onChange={HandleChange}
                                    value={formData.bedroom}
                                />
                                <span>Beds</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="bathroom"
                                    max={10}
                                    min={1}

                                    className="p-3 bg-white rounded-[4px] border border-gray-500"
                                    onChange={HandleChange}
                                    value={formData.bathroom}
                                />
                                <span>Bath</span>
                            </div>

                            {/* prices */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    minLength={5}
                                    maxLength={9} name="regularPrice" max={100000000} min={10000} required
                                    className="p-3 bg-white rounded-[4px] border border-gray-500"
                                    onChange={HandleChange}
                                    value={formData.regularPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Regular Price</p>
                                    <span className="text-xs">($ / month)</span>
                                </div>
                            </div>
                            {formData.offer &&

                                (
                                    <div className="flex items-center gap-2">
                                        <input type="text"
                                            name="discountedPrice"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            minLength={5}
                                            maxLength={9} max={100000000} min={10000} required
                                            className="p-3 bg-white rounded-[4px] border border-gray-500"
                                            onChange={HandleChange}
                                            value={formData.discountedPrice}
                                        />
                                        <div className="flex flex-col items-center">
                                            <p>Discounted Price</p>
                                            <span className="text-xs">($ / month)</span>
                                        </div>
                                    </div>
                                )}


                        </div>

                    </div>

                    {/* second part of form */}
                    {/* image uploading */}
                    <div className="flex flex-col gap-4">

                        <div className="flex  ">
                            <p className="font-bold">Images:</p><span>The first image will be the cover (max 6)</span>
                        </div>

                        <div className="flex items-center ">
                            <div>
                                <input onChange={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    if (input.files) {
                                        setFile(Array.from(input.files));
                                    }
                                }} className="p-3 border border-gray-300 rounded-[3px] w-full " type="file" accept="image/*" multiple name="" id="" />
                            </div>
                            <button onClick={() => {
                                handleUploadImage(file)
                            }} type="button" className=" ml-3 cursor-pointer uppercase border border-green-700 text-green-700 p-3 rounded-[2px]">
                                upload
                            </button>
                        </div>
                        {progress > 0 && (
                                <div>
                                <p className="text-sm mt-1 text-gray-600">{progress}%</p>
                            </div>
                        )}
                        {file.length > 0 ? (
                            <div>
                                {file.map((item, index) => (
                                    <div key={index} className="flex  w-[500px] gap-2 items-center border rounded-[6px] border-gray-500 p-2 my-2">

                                        <img
                                            className="w-[80px] rounded-[6px]"
                                            src={URL.createObjectURL(item)}
                                            alt={item.name}
                                        />
                                        <p className="truncate">{item.name}</p>

                                    </div>
                                ))}
                            </div>
                        ) :
                            (<div>
                                {formData.ImageUrl.map((item, index) => (
                                    <div key={index} className="flex w-[500px] gap-2 items-center border rounded-[6px] border-gray-500 p-2 my-2">
                                        <img
                                            className="w-[80px] rounded-[6px]"
                                            src={item}
                                            alt='img'
                                        />
                                        <p className="truncate">{`image ${index + 1}....`}</p>

                                    </div>
                                ))}
                            </div>)

                        }


                        <div>
                            <button className='disabled:opacity-60 w-full mt-4 max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] text-white cursor-pointer'>
                                {loading ? "Loading..." : " Update Listing"}
                            </button>
                            {Error && <p>{Error}</p>}
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}
