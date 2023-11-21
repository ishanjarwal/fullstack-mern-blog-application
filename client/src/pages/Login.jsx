import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [userData, setUserData] = useState({
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

    const [errors, setErrors] = useState({})
    async function submitLogin(e) {
        e.preventDefault();
        // console.log(userData);
        await axios.post('http://localhost:8080/login', userData, { withCredentials: true })
            .then(val => {
                console.log(val);
                if (val.data?.pass == true) {
                    setAuthenticated(true);
                } else if (val.data?.exists == false) {
                    setErrors({ 'exists': false })
                } else if (val.data?.pass == false) {
                    setErrors({ 'pass': false })
                }
            })
            .catch(err => {
                console.log(err);
                setAuthenticated(false);
            });
    }

    if (authenticated) {
        return <Navigate to={'/'} />
    } else if (authenticated == false) {
        return (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">Email address</label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    required
                                    className="block w-full rounded-md border border-text-muted py-1.5 px-2 text-text shadow-sm outline-none "
                                    onChange={(e) => { setUserData({ ...userData, "email": e.target.value }) }}
                                    value={userData.email}
                                />
                                {errors?.exists == false && (
                                    <span className='block my-1 ms-1 text-red-400 text-xs'>
                                        E-mail not registered with us.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-text">Password</label>
                                <span className="text-sm">
                                    <a href="#" className="font-semibold text-pri">Forgot password?</a>
                                </span>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    required
                                    className="block w-full rounded-md border border-text-muted py-1.5 px-2 text-text shadow-sm outline-none "
                                    onChange={(e) => { setUserData({ ...userData, "password": e.target.value }) }}
                                    value={userData.password}
                                />
                                {errors?.pass == false && (
                                    <span className='block my-1 ms-1 text-red-400 text-xs'>
                                        Incorrect Password.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pri px-3 py-1.5 text-sm font-semibold leading-6 text-light shadow-sm "
                                onClick={submitLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?&nbsp;
                        <Link to={'/signup'} className="font-semibold leading-6 text-pri ">Register Now</Link>
                    </p>
                </div>
            </div>
        )
    }

}

export default Login;
