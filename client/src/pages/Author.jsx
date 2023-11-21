import React, { useEffect, useState } from 'react'
import ArticleListHome from '../sections/ArticleListHome'
import { AiFillInstagram, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineYoutube } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Author = () => {

    const { name } = useParams();
    const [authordetails, setAuthordetails] = useState(null);
    async function getAuthor() {
        const url = 'http://localhost:8080/api/getauthor/' + name;
        await axios.get(url)
            .then(val => {
                if (!val.data.foundAuthor) {
                    // window.location.href = '/'
                }
                setAuthordetails(val.data.author);
            })
    }

    useEffect(() => {
        getAuthor();
    }, [])

    return (
        <section className='flex flex-col items-center justify-center md:pt-20 pt-14'>
            <div className='bg-background w-full py-8 flex flex-col items-center justify-center'>
                <div className='max-w-6xl w-full grid grid-cols-4 gap-4'>
                    <div className='col-span-1'>
                        <div className='h-64 aspect-square overflow-hidden rounded-lg'>
                            {authordetails?.profile && (
                                <img
                                    src={`http://localhost:8080/uploads/profiles/${authordetails?.profile}`}
                                    className='w-full h-full object-cover object-center'
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                    <div className='col-span-3 flex flex-col items-start'>
                        <div className='mb-4'>
                            <span className='block text-sm text-text-muted'>Name</span>
                            <span className='block text-lg text-text'>{authordetails?.fullname}</span>
                        </div>
                        <div className='mb-4'>
                            <span className='block text-sm text-text-muted'>E-mail</span>
                            <span className='block text-lg text-text'>{authordetails?.email}</span>
                        </div>
                        <div className='mb-4'>
                            <span className='block text-sm text-text-muted'>Bio</span>
                            <p className='block text-md text-text'>{authordetails?.bio}</p>
                        </div>
                        <div className='mb-2'>
                            <span className='block text-sm text-text-muted'>Social</span>
                            <div className='flex justify-start items-center space-x-4'>
                                <a href={authordetails?.insta} target='_blank' className='text-3xl'>
                                    <img
                                        src="https://w7.pngwing.com/pngs/722/1011/png-transparent-logo-icon-instagram-logo-instagram-logo-purple-violet-text-thumbnail.png"
                                        alt=""
                                        className='h-8'
                                    />
                                </a>
                                <a href={authordetails?.linkedin} target='_blank' className='text-3xl'>
                                    <img
                                        src="https://w7.pngwing.com/pngs/642/372/png-transparent-link-in-logo-linkedin-logo-linkedin-icons-no-attribution-miscellaneous-blue-angle-thumbnail.png"
                                        alt=""
                                        className='h-7'
                                    />
                                </a>
                                <a href={authordetails?.youtube} target='_blank' className='text-3xl'>
                                    <img
                                        src="https://w7.pngwing.com/pngs/208/269/png-transparent-youtube-play-button-computer-icons-youtube-youtube-logo-angle-rectangle-logo-thumbnail.png"
                                        alt=""
                                        className='h-9'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-6xl py-6'>
                <h1 className='text-3xl font-bold text-text'>Articles by Shivam</h1>
                {/* <h1 className='text-3xl font-bold text-text text-center my-24'>😔 Shivam hasn't posted anything.</h1> */}
                <ArticleListHome />
            </div>
        </section>
    )
}

export default Author
