import React, { useRef, useState, useEffect } from 'react'
import { BiPencil } from 'react-icons/bi'
import axios from 'axios'

const EditProfile = () => {

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

    const [user, setUser] = useState(null);
    async function getUser() {
        await axios.get('http://localhost:8080/api/user', { withCredentials: true })
            .then(val => {
                if (val.data.auth == false) {
                    window.location.href = '/login'
                } else {
                    setUser(val.data);
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getUser();
    }, []);


    const [errors, setErrors] = useState([]);
    async function updateProfile(e) {
        e.preventDefault();
        setErrors([]);
        const updatedProfile = new FormData();
        updatedProfile.append('fullname', user.fullname)
        updatedProfile.append('email', user.email)
        updatedProfile.append('profile', user.profile)
        updatedProfile.append('bio', user.bio)
        updatedProfile.append('insta', user.insta)
        updatedProfile.append('linkedin', user.linkedin)
        updatedProfile.append('youtube', user.youtube)
        await axios.post('http://localhost:8080/api/updateprofile', updatedProfile, { withCredentials: true })
            .then(val => {
                if (val.data?.errors && val.data?.errors.length > 0) {
                    const newErrorsArray = val.data.errors.map(el => {
                        return { "path": el.path, "msg": el.msg }
                    })
                    setErrors(newErrorsArray);
                } else {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <section className='w-full py-4'>
            <h1 className='text-3xl font-bold text-text mb-4 md:px-0 px-2'>Edit Your Profile</h1>
            <div className='p-4 bg-light overflow-x-auto w-full rounded-lg shadow-lg'>
                <form className='max-w-3xl w-full flex flex-col space-y-4'>

                    {/* profile picture */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Profile Picture</label>
                        <div className="mt-1">
                            <label
                                htmlFor="profileInput"
                                className='relative h-32 w-32 bg-text-muted block cursor-pointer'
                            >
                                <img
                                    ref={imagePreview}
                                    src={`${user ? `http://localhost:8080/uploads/profiles/${user.profile}` : ''}`}
                                    alt="profile"
                                    className='w-full h-full object-cover object-center'
                                />
                                <span className='absolute flex justify-center items-center z-10 w-8 h-8 rounded-full bg-light text-pri shadow-lg -bottom-3 -right-3'>
                                    <BiPencil />
                                </span>
                            </label>
                            <input
                                ref={fileInput}
                                id='profileInput'
                                type="file"
                                accept='image/jpeg'
                                className='hidden'
                                onChange={(e) => {
                                    previewImage();
                                    setUser({ ...user, "profile": e.target.files[0] })
                                }}

                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Name</label>
                        {/* error if any */}
                        {errors.filter(el => el.path === "fullname").map((el, index) => {
                            return (
                                <span key={index} className='block text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                        <div className="mt-1">
                            <input
                                type='text'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                onChange={(e) => {
                                    setUser({ ...user, "fullname": e.target.value })
                                }}
                                value={user?.fullname}
                            />
                        </div>
                    </div>

                    {/* email */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Email</label>
                        {/* error if any */}
                        {errors.filter(el => el.path === "email").map((el, index) => {
                            return (
                                <span key={index} className='block text-red-400 text-xs'>
                                    {el.msg}
                                </span>
                            )
                        })}
                        <div className="mt-1">
                            <input
                                type='email'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                onChange={(e) => {
                                    setUser({ ...user, "email": e.target.value })
                                }}
                                value={user?.email}
                            />
                        </div>
                    </div>

                    {/* password */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Password</label>
                        <div className="mt-1">
                            <input
                                disabled
                                type='password'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                value={"12345678"}
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="max-w-sm">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-text-muted">Bio</label>
                        <div className="mt-1">
                            <textarea
                                className="block border border-text-muted w-full rounded-md py-1.5 px-2 font-bold text-text shadow-sm placeholder:text-text-muted sm:text-md sm:leading-6 outline-none"
                                value={`${user?.bio ? user.bio : ''}`}
                                onChange={(e) => {
                                    setUser({ ...user, "bio": e.target.value })
                                }}
                            ></textarea>
                        </div>
                    </div>

                    {/* instagram */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Instagram Profile URL (Optional)</label>
                        <div className="mt-1">
                            <input
                                type='text'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                value={`${user?.insta ? user.insta : ''}`}
                                onChange={(e) => {
                                    setUser({ ...user, "insta": e.target.value })
                                }}
                            />
                        </div>
                    </div>

                    {/* linkedin */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Linkedin Profile URL (Optional)</label>
                        <div className="mt-1">
                            <input
                                type='text'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                value={`${user?.linkedin ? user.linkedin : ''}`}
                                onChange={(e) => {
                                    setUser({ ...user, "linkedin": e.target.value })
                                }}
                            />
                        </div>
                    </div>

                    {/* youtube */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium leading-6 text-text-muted">Youtube Channel URL (Optional)</label>
                        <div className="mt-1">
                            <input
                                type='text'
                                autoComplete="off"
                                className="block w-full rounded-md border border-text-muted outline-none py-1.5 px-2 text-text-muted "
                                value={`${user?.youtube ? user.youtube : ''}`}
                                onChange={(e) => {
                                    setUser({ ...user, "youtube": e.target.value })
                                }}
                            />
                        </div>
                    </div>

                    {/* submit/save */}
                    <div className='w-full  max-w-sm flex space-x-2'>
                        <button
                            className='w-full py-2 px-4 bg-pri text-light rounded-md hover:brightness-90'
                            onClick={updateProfile}
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default EditProfile
