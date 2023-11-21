import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, Navigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const PanelLayout = () => {

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

    const [mobileMenu, setMobileMenu] = useState(false);
    function handleMenu() {
        if (window.innerWidth >= 768) {
            setMobileMenu(true);
        } else {
            setMobileMenu(false);
        }
    }
    window.addEventListener("resize", () => {
        handleMenu();
    })
    useEffect(() => {
        handleMenu();
    }, [])

    if (authenticated == false) {
        return <Navigate to={'/login'} />
    } else if (authenticated == true) {
        return (
            <main className='w-full flex items-center justify-center bg-background'>
                <section className='w-full grid grid-cols-6'>
                    <AnimatePresence>
                        {mobileMenu && (
                            <motion.div
                                className='xl:col-span-1 md:col-span-2 md:relative absolute z-20 bg-dark min-h-screen max-h-screen overflow-auto h-full flex flex-col justify-start items-start py-8 px-4 space-y-4'
                                initial={{ opacity: 0, x: "-100%" }}
                                animate={{ opacity: 1, x: "0%" }}
                                exit={{ opacity: 0, x: "-100%" }}
                                transition={{ type: "Inertia" }}
                            >
                                <h1 className='text-light text-3xl mx-3 md:block hidden'>Logo</h1>
                                <div className='w-full flex flex-col justify-start items-start space-y-2'>
                                    <Link to={''} className='w-full text-lg text-text-muted flex justify-start space-x-2 py-1 px-3 rounded-md hover:bg-light duration-100' href="/">Your Posts</Link>
                                    <Link to={'create'} className='w-full text-lg text-text-muted flex justify-start space-x-2 py-1 px-3 rounded-md hover:bg-light duration-100' href="/">Create New Post</Link>
                                    <Link to={'profile'} className='w-full text-lg text-text-muted flex justify-start space-x-2 py-1 px-3 rounded-md hover:bg-light duration-100' href="/">Your Profile</Link>
                                    <Link to={'saved'} className='w-full text-lg text-text-muted flex justify-start space-x-2 py-1 px-3 rounded-md hover:bg-light duration-100' href="/">Saved Posts</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className='xl:col-span-5 md:col-span-4 col-span-6 bg-background min-h-screen max-h-screen overflow-auto pt-0 sm:px-4 px-0 py-4  flex flex-col justify-start items-start w-full'>
                        <div className='md:hidden w-full bg-light p-4 flex justify-between items-center'>
                            <h1>Logo</h1>
                            <button className='p-2 text-lg' onClick={() => { setMobileMenu(!mobileMenu) }} >
                                {mobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
                            </button>
                        </div>
                        <Outlet />
                    </div>
                </section>
            </main>
        )
    }
}

export default PanelLayout;
