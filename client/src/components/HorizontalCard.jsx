import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCard = ({ info }) => {
    return (
        <div className='w-full flex justify-start items-start space-x-4' >
            <Link to={`/post/${info._id}`} className='rounded-md h-20 w-20 overflow-hidden'>
                <img
                    className='w-full h-full object-cover object-center'
                    src={`http://localhost:8080/uploads/thumbnails/${info.thumbnail}`}
                    alt="post"
                />
            </Link>
            <div className='flex-1 flex flex-col justify-start items-start'>
                <Link to={`/post/${info._id}`}>
                    <h1 className='text-text font-bold'>{info.title}</h1>
                </Link>
                <span className='text-text-muted text-sm'>{info.createdAt}</span>
            </div>
        </div>
    )
}

export default HorizontalCard
