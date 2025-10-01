import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

export default function Search() {
    const [loading, setLoading] = useState<boolean>()
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false)
    const [listingData, setListingData] = useState([])
    const [sideBarSearch, setsideBarSearch] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'create_at',
        order: 'desc'

    })


    useEffect(() => {
        const urlParam = new URLSearchParams(location.search)
        const searchUrlForm = urlParam.get('searchTerm')
        const typeUrlForm = urlParam.get('type')
        const parkingUrlForm = urlParam.get('parking')
        const furnishedUrlForm = urlParam.get('furnished')
        const offerUrlForm = urlParam.get('offer')
        const sortUrlForm = urlParam.get('sort')
        const orderUrlForm = urlParam.get('order')

        if (
            searchUrlForm ||
            typeUrlForm ||
            parkingUrlForm ||
            furnishedUrlForm ||
            offerUrlForm ||
            sortUrlForm ||
            orderUrlForm
        )
            setsideBarSearch({
                searchTerm: searchUrlForm || "",
                type: typeUrlForm || 'all',
                parking: parkingUrlForm === "true", 
                furnished: furnishedUrlForm === "true",
                offer: offerUrlForm === "true",
                sort: sortUrlForm || 'create_at',
                order: orderUrlForm || 'desc'
            })

        const queryparam = urlParam.toString()
        setLoading(true)
        axios.get(`/api/listing/get?${queryparam}`)
            .then((response) => {
                const data = response.data
                setListingData(data)
               
                if (data.length >= 9) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
          
                setLoading(false)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        console.log('useeffect running ')
    }, [location.search]);

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        if (e.target.name === 'all' || e.target.name === 'sell' || e.target.name === 'rent') {
            setsideBarSearch({
                ...sideBarSearch,
                type: e.target.name
            }
            )
        }

        if (e.target.name === 'searchTerm') {
            setsideBarSearch({
                ...sideBarSearch,
                searchTerm: e.target.value
            }
            )
        }


        if (e.target.name === "parking" || e.target.name === "furnished" || e.target.name === "offer") {
            if (e.target instanceof HTMLInputElement) {
                setsideBarSearch(
                    {
                        ...sideBarSearch,
                        [e.target.name]: e.target.checked || e.target.checked === 'true' ? true : false
                    })
            }
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split('_')[0]
            const order = e.target.value.split('_')[1]
            setsideBarSearch({
                ...sideBarSearch
                , sort, order
            })
        }

    }
    const handleShowMore = async () => {
        const numberOfListings = listingData.length
        const urlParams = new URLSearchParams(location.search)
        urlParams.set("startIndex", String(numberOfListings))

        try {
            const res = await axios.get(`/api/listing/get?${urlParams.toString()}`)
            const data = res.data
            setListingData([...listingData, ...data])
            if (data.length < 9) {
                setShowMore(false)
            }
        } catch (err) {
            console.log(err)
        }
    }


    const submitChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlParam = new URLSearchParams()
        urlParam.set('searchTerm', sideBarSearch.searchTerm)
        urlParam.set('type', sideBarSearch.type)
        urlParam.set('parking', String(sideBarSearch.parking))
        urlParam.set('offer', String(sideBarSearch.offer))
        urlParam.set('sort', sideBarSearch.sort)
        urlParam.set('order', sideBarSearch.order)
        urlParam.set('furnished', String(sideBarSearch.furnished))

        const queryParam = urlParam.toString();
        console.log(queryParam);
        navigate(`/search?${queryParam}`)


    }

    return (
        <>
            <div className="flex 
                    md:flex-row
                    xsm:flex-col 
                    px-3
                    ">
                <div>
                    <form onSubmit={submitChange} className="w-full flex flex-col gap-8 border-gray-400 md:border-r-2 p-2 h-screen  pt-6 ">
                        <div className="flex items-center gap-2 w-full ">
                            <span className="whitespace-nowrap">Search Term:</span>
                            <div className='flex items-center justify-between  bg-[#F1F5F9] p-3 rounded-[8px] border border-gray-400 
                                   xsm:max-w-full'   >
                                <input className='w-full outline-none' type="text" placeholder='Search...'
                                    name="searchTerm"
                                    value={sideBarSearch.searchTerm}
                                    onChange={HandleChange}
                                />


                            </div>

                        </div>
                        <div className="flex flex-wrap gap-2">

                            <div className="flex items-center ">
                                <label >Type</label>
                                <input type="checkbox" className="w-6"
                                    name="all"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.type === 'all'} />
                                <span>Rent & Sale</span>
                            </div>

                            <div className="flex items-center ">
                                <input type="checkbox" className="w-6"
                                    name="sell"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.type === 'sell'} />
                                <span>Sale</span>
                            </div>

                            <div className="flex items-center ">
                                <input type="checkbox" className="w-6"
                                    name="rent"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.type === 'rent'} />
                                <span>Rent</span>
                            </div>

                            <div className="flex items-center ">
                                <input type="checkbox" className="w-6"
                                    name="offer"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.offer} />
                                <span>offer</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <h1>Amienties:</h1>
                            <div className="flex items-center ">
                                <input type="checkbox" className="w-6"
                                    name="parking"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.parking} />
                                <span>parking</span>
                            </div>

                            <div className="flex items-center ">
                                <input type="checkbox" className="w-6"
                                    name="furnished"
                                    onChange={HandleChange}
                                    checked={sideBarSearch.furnished} />
                                <span>furnished</span>
                            </div>
                        </div>

                        <div  >
                            <label className="mr-2" >Sort:</label>
                            <select name="" id="sort_order"
                                className="p-3 border border-gray-400 rounded-lg"
                                onChange={HandleChange}
                                defaultValue={'created_at_desc'}
                            >
                                <option value="regularPrice_desc">Price High to Low</option>
                                <option value="regularPrice_asc">Price Low to High</option>
                                <option value="createdAt_asc">Oldest</option>
                                <option value="createdAt_desc">Latest</option>

                            </select>
                        </div>

                        <div className="w-full  max-w-[450px] min-w-[300px] bg-[#334156] p-4 rounded-[6px] flex justify-center items-center">
                            <button className="cursor-pointer text-white outline-none disabled:opacity-50" type="submit">
                                Search
                            </button>
                        </div>
                    </form>

                </div>

                <div className="p-4">
                    <p className="mb-8">
                        Listing Result
                    </p>

                    {!loading && listingData.length === 0 &&
                        "No listing found"}
                    <div className="flex flex-wrap gap-4">
                        {!loading &&
                            listingData
                            &&
                            listingData.map((item) =>
                                <ListingCard
                                image={item.ImageUrl[0]}
                                    key={item._id}
                                    listing={item}
                                />
                            )

                        }
                    </div>
                    {showMore && (
                        <div className="mt-4">
                            <button
                                onClick={handleShowMore}
                                className="inline ml-2 cursor-pointer text-green-600 hover:underline ">
                                Show more...
                            </button>
                        </div>
                    )}
                </div>
                
                <div>
                   
                </div>

            </div>
        </>
    )
}
