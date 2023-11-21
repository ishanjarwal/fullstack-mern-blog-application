import React, { useEffect, useState } from 'react'
import HorizontalCard from '../components/HorizontalCard'
import axios from 'axios'

const PostSidebar = ({ tags }) => {


    const [data, setData] = useState(null)

    async function getPosts() {
        await axios.get("http://localhost:8080/api/posts")
            .then(val => {
                setData(val.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getPosts()
    })


    return (
        <div className='w-full bg-light shadow-xl rounded-lg p-4 flex flex-col space-y-4'>
            <div className='w-full'>
                <h1 className='mb-4 text-text font-bold'>Latest Articles</h1>
                <div className='flex flex-col w-full items-center justify-start space-y-2'>
                    {data && data.map((el, index) => {
                        return (
                            <HorizontalCard key={index} info={el} />
                        )
                    })}
                </div>
            </div>
            <div>
                <h1 className='mb-4 text-text font-bold'>Related Tags</h1>
                <div className='flex justify-start items-start flex-wrap gap-2'>
                    {tags.map((el, index) => {
                        return (
                            <a href='/' key={index} className='py-1 px-3 rounded-md border border-pri text-pri w-min whitespace-nowrap text-sm'>
                                {el}
                            </a>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default PostSidebar
