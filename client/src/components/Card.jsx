import React from 'react'
import { motion } from 'framer-motion'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import { Link } from 'react-router-dom'

const Card = ({ info }) => {
    return (
        <motion.div
            className='overflow-hidden rounded-lg shadow-xl flex flex-col justify-start items-center w-full bg-light'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: .3 }}
            viewport={{ once: true }}
        >
            <Link to={`/post/${info._id}`} className='w-full h-48 bg-background'>
                <img
                    src={`http://localhost:8080/uploads/thumbnails/${info.thumbnail}`}
                    alt="post"
                    className='w-full h-full object-cover object-center'
                />
            </Link>
            <div className='flex flex-col justify-start items-start w-full space-y-2 py-4 px-4'>
                <Link to={`/post/${info._id}`}>
                    <h1 className='text-text font-bold text-xl'>{info.title}</h1>
                </Link>
                <p className='text-text-muted text-md'>{info.summary}</p>
                <div className='flex lg:flex-row flex-col w-full lg:justify-between lg:items-center items-start justify-start'>
                    <div className='flex justify-start items-center'>
                        <div className='flex justify-center items-center rounded-full w-10 h-10 overflow-hidden'>
                            <img
                                src={`http://localhost:8080/uploads/profiles/${info.aid.profile}`}
                                className='w-full h-full object-cover object-center'
                            />
                        </div>
                        <div className='flex flex-col justify-center items-start'>
                            <h2 className='text-text ms-2 text-md font-extrabold italic'>{info.aid.fullname}</h2>
                            <h2 className='lg:hidden text-text-muted ms-2 text-sm italic'>
                                {formatDistanceToNow(parseISO(info.createdAt))}
                            </h2>
                        </div>
                    </div>
                    <h2 className='hidden lg:block text-text-muted text-sm italic'>
                        {formatDistanceToNow(parseISO(info.createdAt))}
                    </h2>
                </div>
            </div>
        </motion.div>
    )
}

export default Card
