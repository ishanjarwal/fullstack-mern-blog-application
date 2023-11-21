import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AllPosts = () => {


    const [posts, setPosts] = useState(null);
    async function getPosts() {
        await axios.get('http://localhost:8080/api/getPostsByAuthor', { withCredentials: true })
            .then(val => {
                setPosts(val.data.results);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getPosts();
    }, []);


    async function deletePost(id) {
        await axios.post("http://localhost:8080/api/delete", { postId: id })
            .then(val => {
                console.log(val.data)
                // window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <section className='w-full py-4'>
            <h1 className='text-3xl font-bold text-text mb-4 md:px-0 px-2'>Your Posts</h1>
            <div className='p-4 bg-light overflow-x-auto w-full rounded-lg shadow-lg'>
                {posts && posts.length > 0 && (
                    <table className="w-full text-sm text-left text-text-muted">
                        <thead className="text-xs text-text uppercase bg-background">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Thumbnail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.map((el, index) => {
                                return (
                                    <tr key={index} className="bg-light border-b border-text-muted text-text-muted">
                                        <th scope="row" className="px-6 py-4 font-medium text-text-muted whitespace-nowrap">
                                            <div className='h-24 w-40'>
                                                <img
                                                    className='w-full h-full object-cover object-center'
                                                    src={`http://localhost:8080/uploads/thumbnails/${el.thumbnail}`}
                                                    alt="" />
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 text-ellipsis">
                                            {el.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.createdAt}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/account/update/${el._id}`} className='py-2 px-4 rounded-md text-light bg-blue-600 hover:bg-blue-800'>Edit</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    deletePost(el._id)
                                                }}
                                                className='py-2 px-4 rounded-md text-light bg-red-600 hover:bg-red-700'
                                            >
                                                Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
                {posts && posts.length == 0 && (
                    <h1 className='text-4xl font-bold text-text text-center my-20'>😔 You don't have any posts.</h1>
                )}
            </div>
        </section>
    )
}

export default AllPosts
