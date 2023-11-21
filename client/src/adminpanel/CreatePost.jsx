import React, { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'

const CreatePost = () => {

    const fileInput = useRef();
    const imagePreview = useRef();
    function previewImage() {
        const file = fileInput.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.current.src = e.target.result;
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.current.src = ''; // Clear the preview if no file is selected
        }
    }

    const initBlog = {
        "title": "",
        "content": "",
        "summary": "",
        "thumbnail": null,
        "tags": [],
        "category": "",
        "isDraft": false
    }
    const [newblog, setNewblog] = useState(initBlog);
    const [tag, setTag] = useState("");

    const toolbar_options = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']                                         // remove formatting button
    ];

    const [errors, setErrors] = useState([]);
    async function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        const newPost = new FormData();
        newPost.append('title', newblog.title)
        newPost.append('summary', newblog.summary)
        newPost.append('thumbnail', newblog.thumbnail)
        newPost.append('category', newblog.category)
        newPost.append('content', newblog.content)
        newPost.append('tags', JSON.stringify(newblog.tags))
        await axios.post('http://localhost:8080/api/create', newPost, { withCredentials: true })
            .then(val => {
                if (val.data?.errors && val.data?.errors.length > 0) {
                    // console.log(val.data.errors)
                    const newErrorsArray = val.data.errors.map(el => {
                        return { "path": el.path, "msg": el.msg }
                    })
                    // console.log(newErrorsArray);
                    setErrors(newErrorsArray);
                }
                if (val.data?.created == true) {
                    window.location.href = '/account'
                }
            })
            .catch(err => {
                window.location.href = '/502'
            })
    }

    return (
        <section className='createpost w-full py-4'>
            <h1 className='text-3xl font-bold text-text mb-4 md:px-0 px-2'>Create a New Post</h1>
            <div className='p-4 bg-light overflow-x-auto w-full rounded-lg shadow-lg'>
                <form className='max-w-3xl w-full flex flex-col space-y-4'>

                    {/* Title */}
                    <div className="">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-text-muted">Title</label>
                        <div className="mt-1">
                            <textarea
                                className="block border border-text-muted w-full rounded-md py-1.5 px-2 font-bold text-text shadow-sm placeholder:text-text-muted sm:text-md sm:leading-6 outline-none"
                                onChange={(e) => setNewblog({ ...newblog, "title": e.target.value })}
                                value={newblog.title}
                            ></textarea>
                        </div>
                        {/* error if any */}
                        {errors.filter(el => el.path === "title").map((el, index) => {
                            return (
                                <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                    </div>

                    {/* summary */}
                    <div className="">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-text-muted">Summary</label>
                        <div className="mt-1">
                            <textarea
                                className="block border border-text-muted w-full rounded-md py-1.5 px-2 text-text shadow-sm placeholder:text-text-muted sm:leading-6 outline-none"
                                onChange={(e) => setNewblog({ ...newblog, "summary": e.target.value })}
                                value={newblog.summary}
                            ></textarea>
                        </div>
                        {/* error if any */}
                        {errors.filter(el => el.path === "summary").map((el, index) => {
                            return (
                                <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                    </div>

                    {/* category */}
                    <div className="">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Category</label>
                        <div className="mt-1">
                            <select
                                id="category"
                                name="category"
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                onChange={(e) => setNewblog({ ...newblog, "category": e.target.value })}
                                value={newblog.category}
                            >
                                <option value={''}>Please select a Category</option>
                                <option value={'Education'}>Education</option>
                                <option value={'Coding'}>Coding</option>
                                <option value={'Programming'}>Programming</option>
                                <option value={'Tips and Tricks'}>Tips and Tricks</option>
                            </select>
                        </div>
                        {/* error if any */}
                        {errors.filter(el => el.path === "category").map((el, index) => {
                            return (
                                <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                    </div>


                    {/* thumbnail input */}
                    <div>
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-text-muted">Thumbnail</label>
                        {/* error if any */}
                        {errors.filter(el => el.path === "thumbnail").map((el, index) => {
                            return (
                                <span key={index} className='block my-1  text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                        <div className="mt-1 flex justify-center rounded-lg border border-text-muted px-6 py-10">
                            <div className="text-center">
                                <span className='text-6xl text-text-muted'>
                                    <BsCardImage className='mx-auto' />
                                </span>
                                <div className="mt-4 flex text-sm leading-6 text-text">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-pri outline-none">
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            accept='image/jpeg'
                                            className="sr-only"
                                            ref={fileInput}
                                            onChange={(e) => {
                                                previewImage();
                                                setNewblog({ ...newblog, "thumbnail": e.target.files[0] })
                                            }}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-text">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* thumbnail preview */}
                    <div className='w-full rounded-lg overflow-hidden border border-text-muted p-2'>
                        <img ref={imagePreview} className='w-full h-auto rounded-md' />
                    </div>

                    <div>
                        <label className='text-text-muted text-sm'>
                            Blog Content
                        </label>
                        {/* error if any */}
                        {errors.filter(el => el.path === "content").map((el, index) => {
                            return (
                                <span key={index} className='block my-1 text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                        <ReactQuill
                            theme="snow"
                            value={newblog.content}
                            onChange={value => setNewblog({ ...newblog, "content": value })}
                            modules={
                                { toolbar: toolbar_options }
                            }
                        />
                    </div>

                    {/* tags */}
                    <div className='max-w-sm'>
                        <label className="block text-sm font-medium leading-6 text-text-muted">Tags (At least 5)</label>
                        <div className='border border-text-muted rounded-lg'>
                            <div className="p-2 flex justify-between border-b border-text-muted">
                                <input
                                    placeholder='tech, coding etc.'
                                    className="w-full font-bold px-1 text-text placeholder:text-gray-300 sm:text-md outline-none"
                                    value={tag}
                                    onChange={(e) => {
                                        setTag(e.target.value)
                                    }}
                                />
                                <button
                                    className='px-3 bg-pri text-light rounded-md text-sm py-1 hover:brightness-90'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (tag != "" && tag.indexOf(" ") === -1) {
                                            setNewblog({ ...newblog, "tags": [...newblog.tags, tag] });
                                            setTag("");
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <div className='p-2 flex flex-wrap gap-2'>
                                {newblog.tags.map((el, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className='p-1 flex items-center justify-between space-x-1 border border-pri text-pri text-xs rounded-md'
                                        >
                                            <span>
                                                {el}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const modTags = [...newblog.tags]
                                                    modTags.splice(index, 1)
                                                    setNewblog((prev) => ({ ...prev, tags: modTags }))
                                                }}
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        {/* error if any */}
                        {errors.filter(el => el.path === "tags").map((el, index) => {
                            return (
                                <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                    </div>

                    <div className='ms-auto flex space-x-2'>
                        <button
                            className='py-2 px-4 bg-pri text-light rounded-md hover:brightness-90'
                            onClick={handleSubmit}
                        >
                            Post
                        </button>
                        <button className='py-2 px-4 bg-light text-pri rounded-md border border-pri hover:brightness-90'>
                            Draft
                        </button>
                    </div>
                </form>
            </div >
        </section >
    )
}

export default CreatePost
