import React, { useState, useEffect } from 'react'
import PostSidebar from '../sections/PostSidebar'
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import { useParams } from 'react-router-dom';

const Post = () => {

    const [post, setPost] = useState(null);
    const { id } = useParams();
    async function getPost() {
        const url = "http://localhost:8080/api/getpost/" + id;
        await axios.get(url)
            .then(val => {
                setPost(val.data.post);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <section className='md:pt-20 pt-14 bg-light w-full flex items-center justify-center'>
            <div className='max-w-6xl w-full h-full flex justify-between items-center bg-light'>
                <div className='w-full grid lg:grid-cols-3 grid-cols-1 gap-x-4'>
                    <article className='w-full lg:col-span-2 col-span-1 py-4 xl:px-0 px-4 flex flex-col justify-start items-start space-y-4'>
                        {/* breadcrumbs */}
                        <div className='w-full flex justify-start items-center lg:text-lg text-sm text-text-muted'>
                            <span>Home</span>
                            <span>&nbsp;/&nbsp;</span>
                            <span>Articles</span>
                            <span>&nbsp;/&nbsp;</span>
                            <span className='truncate'>{post && post.title}</span>
                        </div>

                        {/* thumbnail */}
                        <div className='w-full rounded-lg overflow-hidden flex items-center justify-center' >
                            {post && (
                                <img
                                    className='w-full h-full object-cover object-center'
                                    src={`http://localhost:8080/uploads/thumbnails/${post.thumbnail}`}
                                    alt="Post"
                                />
                            )}
                        </div>
                        {/* category */}
                        <span className='lg:text-xl text-md text-text-muted font-bold uppercase'>
                            {post && post.category}
                        </span>

                        {/* author information */}
                        <div className='w-full flex justify-start items-center space-x-2'>
                            <div className='rounded-full overflow-hidden w-12 h-12'>
                                {post && (
                                    <img
                                        src={`http://localhost:8080/uploads/profiles/${post.aid.profile}`}
                                        alt=""
                                        className='w-full h-full object-cover object-center'
                                    />
                                )}
                            </div>
                            <h1 className='font-bold text-lg'>{post && post.aid.fullname}</h1>
                            <h2>{post && formatDistanceToNow(parseISO(post.createdAt))}</h2>
                        </div>

                        {/* blog heading */}
                        <h1 className='lg:text-4xl text-3xl text-text font-extrabold'>
                            {post && post.title}
                        </h1>

                        {/* blog content */}
                        {post && (
                            <div className='blog_content_wrapper w-full' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        )}
                    </article>
                    <div className='col-span-1 p-4'>
                        {post && (
                            <PostSidebar tags={post.tags} />
                        )}
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Post
