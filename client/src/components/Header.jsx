import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {

    const [mobileNav, setMobileNav] = useState(false);

    const [user, setUser] = useState(null);
    async function getUser() {
        await axios.get('http://localhost:8080/api/user', { withCredentials: true })
            .then(val => {
                if (val.data.auth == false) {
                    setUser(null);
                } else {
                    setUser(val.data);
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getUser();
    }, []);

    async function handleLogout() {
        await axios.get('http://localhost:8080/logout', { withCredentials: true })
            .then(val => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <header className='fixed top-0 z-50 flex items-center justify-center md:h-20 h-14 bg-background w-full'>
            <div className='relative max-w-6xl w-full h-full flex justify-between items-center px-4 xl:px-0'>
                <a className='text-2xl' href="/">Logo</a>
                <div className='flex justify-end items-center space-x-4'>
                    <nav className='hidden md:flex space-x-4 items-center text-text font-bold'>
                        <a href="/">Articles</a>
                        <a href="/">Tutorials</a>
                        <a href="/">About Me</a>
                        <a href="/">Portfolio</a>
                    </nav>
                    {!user && (
                        <Link to={'/login'} className='rounded-full py-1 md:px-6 px-4 text-sm md:text-md border-2 border-pri text-text hover:bg-pri hover:text-light duration-100'>Login</Link>
                    )}
                    {user && (
                        <div className='group relative w-10 h-10 bg-text-muted rounded-full flex justify-center items-center'>
                            <span
                                className='w-10 h-10 rounded-full block overflow-hidden cursor-pointer'
                            >
                                {user &&
                                    <img
                                        src={`http://localhost:8080/uploads/profiles/${user?.profile}`}
                                        className='h-full w-full object-cover object-center'
                                    />
                                }
                            </span>
                            <div
                                className='group-hover:visible invisible absolute top-full right-0 p-3 rounded-md bg-light shadow-lg flex flex-col justify-start items-start space-y-1'
                                style={{ 'minWidth': '150px' }}
                            >
                                <Link className='w-full duration-100 rounded-md hover:bg-dark hover:text-light py-1 px-3 whitespace-nowrap' to={'/account'}>Dashboard</Link>
                                <Link className='w-full duration-100 rounded-md hover:bg-dark hover:text-light py-1 px-3 whitespace-nowrap' to={'/account/profile'}>Profile</Link>
                                <Link className='w-full duration-100 rounded-md hover:bg-dark hover:text-light py-1 px-3 whitespace-nowrap' to={'/account/saved'}>Saved</Link>
                                <Link className='w-full duration-100 rounded-md hover:bg-dark hover:text-light py-1 px-3 whitespace-nowrap' to={'/account/create'}>Write New</Link>
                                <Link className='w-full duration-100 rounded-md hover:bg-dark hover:text-light py-1 px-3 whitespace-nowrap' to={'/account/comments'}>Your Comments</Link>
                                <button
                                    className='w-full border-t border-text-muted py-2 px-3 text-center bg-dark rounded-md text-light'
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        className='block md:hidden text-text'
                        onClick={() => setMobileNav(!mobileNav)}
                    >
                        {!mobileNav && <AiOutlineMenu />}
                        {mobileNav && <AiOutlineClose />}
                    </button>
                </div>
                {/* mobile nav */}
                <AnimatePresence>
                    {mobileNav && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='z-50 absolute top-full left-0 md:hidden flex flex-col w-full justify-center items-start space-y-2 py-4 bg-background'>
                            <a className='text-lg w-full text-center text-text font-bold' href="/">Articles</a>
                            <a className='text-lg w-full text-center text-text font-bold' href="/">Tutorials</a>
                            <a className='text-lg w-full text-center text-text font-bold' href="/">About Me</a>
                            <a className='text-lg w-full text-center text-text font-bold' href="/">Portfolio</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Header
