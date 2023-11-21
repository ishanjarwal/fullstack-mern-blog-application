import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const [userData, setUserData] = useState({
        "fullname": "",
        "email": "",
        "password": ""
    });


    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/auth', { withCredentials: true })
            .then(val => {
                if (val.data.auth) {
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                }
            })
            .catch(err => {
                window.location.href = '/502'
            })
    }, []);

    const [errors, setErrors] = useState([]);
    const [exists, setExists] = useState(false);
    async function submitSignup(e) {
        e.preventDefault();
        // console.log(userData);
        await axios.post('http://localhost:8080/signup', userData)
            .then(val => {
                // console.log(val);
                if (val.data.errors && val.data?.errors.length > 0) {
                    const newErrorsArray = val.data.errors.map(el => {
                        return { "path": el.path, "msg": el.msg }
                    })
                    setErrors(newErrorsArray);
                } else if (val.data.exists) {
                    setExists(true);
                } else if (val.data.created) {
                    window.location.href = "/login"
                }
            })
            .catch(err => {
                window.location.href = '/502'
            });
    }

    if (authenticated) {
        return <Navigate to={'/'} />
    } else if (authenticated == false) {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text">Create Your Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" >
                        <div>

                            {/* user exists message */}
                            {exists && (
                                <span className='block my-1 text-red-400 text-sm'>
                                    Your are already registered with us. Login instead.
                                </span>
                            )}
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">Your Name</label>
                            <div className="mt-2">
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border border-text-muted py-1.5 px-2 text-text shadow-sm outline-none "
                                    style={errors.find(el => el.path == "fullname") ? { "border": "2px solid red" } : {}}
                                    onChange={(e) => { setUserData({ ...userData, "fullname": e.target.value }) }}
                                    value={userData.fullname}
                                />
                                {/* error if any */}
                                {errors.filter(el => el.path === "fullname").map((el, index) => {
                                    return (
                                        <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                            {el.msg}
                                        </span>
                                    )
                                })}

                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">Email address</label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border border-text-muted py-1.5 px-2 text-text shadow-sm outline-none "
                                    style={errors.find(el => el.path == "email") ? { "border": "2px solid red" } : {}}
                                    onChange={(e) => { setUserData({ ...userData, "email": e.target.value }) }}
                                    value={userData.email}
                                />
                                {/* error if any */}
                                {errors.filter(el => el.path === "email").map((el, index) => {
                                    return (
                                        <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                            {el.msg}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-text">Create a Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border border-text-muted py-1.5 px-2 text-text shadow-sm outline-none "
                                    style={errors.find(el => el.path == "password") ? { "border": "2px solid red" } : {}}
                                    onChange={(e) => { setUserData({ ...userData, "password": e.target.value }) }}
                                    value={userData.password}
                                />
                                {/* error if any */}
                                {errors.filter(el => el.path === "password").map((el, index) => {
                                    return (
                                        <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                            {el.msg}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pri px-3 py-1.5 text-sm font-semibold leading-6 text-light shadow-sm "
                                onClick={submitSignup}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?&nbsp;
                        <Link to={'/login'} className="font-semibold leading-6 text-pri ">Login Now</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Signup
