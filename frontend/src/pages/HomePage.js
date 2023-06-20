import React, { useEffect, useState } from 'react'
import axios from 'axios'


const HomePage = () => {

    const [ Url, setUrl ] = useState("")
    const [ inputValue, setInputValue ] = useState('');
    const [ data, setData] = useState([])
    const [ copied, setCopied ] = useState(false)
    const [ full, setFull ] = useState("")

    const base = "http://localhost:8000";

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8000/url", {
                url: Url
            })
            setInputValue(res.data.id);
            setFull(base + "/" + inputValue);
            console.log(full)
        } catch(error) {}
    }
    //function to copy the text from button 
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${inputValue}`)
        .then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000)
        },
        (err) => {
            console.log("Failed to copy", err.message)
        }
        )
    }

    const handleLink = async () => {
        const res = await axios.get(full)
        window.location.replace(res)
    }


    useEffect(() => {
        const fetchUrl = async () => {
            const res = await axios.get("http://localhost:8000/")
            setData(res.data)
        }
        fetchUrl()
    }, )


  return (
    <div className='py-12 flex flex-col items-center space-y-12 min-h-screen w-screen px-5'>
        <h1 className='text-6xl font-extrabold text-indigo-700'>Sarthak's Short Url</h1>
        <form 
            className='w-full md:w-1/2 bg-white shadow-md rounded-md border p-6 flex flex-col items-center space-y-6'
            onSubmit={handleSubmit}
        >
            <h1 className='text-xl md:text-3xl font-bold text-gray-800'>Enter the link here that is to be shortened:</h1>
            <input
                placeholder='Enter the link'
                className='border-2 rounded-md px-4 py-1 md:w-3/4 w-full' 
                onChange={(e) => setUrl(e.target.value)}
            />
            <button 
                type='submit'
                className='text-white bg-indigo-600 font-bold text-xl md:text-2xl rounded-full py-2 px-5'
            >
                Create
            </button>
        </form>
        <div className='w-full md:w-1/2 bg-white shadow-md rounded-md border p-6 flex flex-col items-center space-y-6'>
            <h1 className='text-xl md:text-3xl font-bold text-gray-800'>Your Shortened URL: </h1>
            <input
                placeholder='Enter the link'
                className='border-2 rounded-md px-4 py-1 md:w-3/4 w-full' 
                value={Url ? `${inputValue}` : ''}
                readOnly
            />
            <h1>
                Long URL: <a href={Url} className='font-bold text-sky-600'>{Url}</a>
            </h1>
            <div className='flex flex-row justify-center items-start'>
                <button 
                    type='submit'
                    className={`text-white font-bold text-xl md:text-2xl rounded-full py-2 px-5 ${copied ? 'scale-105 duration-300 bg-purple-700': 'bg-indigo-600'}`}
                    onClick={copyToClipboard}
                >
                    {copied ? "Copied" : "Copy URL"}
                </button>

            </div>
        </div>
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b dark:border-neutral-500 font-extrabold text-base md:text-xl">
                        <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Link</th>
                        <th scope="col" className="px-6 py-4">Short ID</th>
                        <th scope="col" className="px-6 py-4 text-xs md:text-base flex">Number of Clicks</th>
                        </tr>
                    </thead>
                        {data.map((item, index) => (
                        <tbody key={item.id}>
                            <tr key={index+1} className={`border-b dark:border-neutral-500 text-sky-600 font-bold ${(index+1) % 2 === 1 ? 'bg-white' : 'bg-transparent'}`}>
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-black">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-xs md:text-base"><a href={item.redirectURL} target="_blank" rel="noreferrer">{item.redirectURL}</a></td>
                                <td className="whitespace-nowrap px-6 py-4"><a href={`http://localhost:8000/${item.shortId}`} target='_blank' rel="noreferrer">{`${item.shortId}`}</a></td>
                                <td className="whitespace-nowrap px-6 py-4 text-black">{item.visitHistory.length}</td>
                            </tr>
                        </tbody>
                    ))}                  
                    </table>    
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default HomePage