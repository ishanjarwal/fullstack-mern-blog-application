import React, { useEffect } from 'react'
import '../App.css'
import Hero from '../sections/Hero';
import ArticleListHome from '../sections/ArticleListHome';

const Homepage = () => {

    useEffect(() => {
        document.title = "Coding Hacks and more"
    }, []);

    return (
        <>
            <Hero />
            <div className='w-full relative -top-40'>
                <ArticleListHome />
            </div>
        </>
    )
}

export default Homepage


