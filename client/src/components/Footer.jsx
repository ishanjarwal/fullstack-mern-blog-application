import React from 'react'
import { AiOutlineInstagram, AiOutlineYoutube, AiOutlineLinkedin, AiOutlineWhatsApp } from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className='w-full flex justify-center items-center bg-background'>
            <div className='max-w-6xl w-full grid lg:grid-cols-3 grid-cols-1 py-8 gap-16 xl:px-0 px-4'>
                <div className='col-span-1 flex flex-col items-start justify-start space-y-4'>
                    <h1 className='text-4xl text-text font-bold'>LOGO</h1>
                    <p className='text-md text-text-muted '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sequi </p>
                    <div className='flex w-auto justify-start items-center space-x-2'>
                        <a href='/' className='bg-light shadow-md text-pri rounded-full text-lg h-10 w-10 flex items-center justify-center'>
                            <AiOutlineInstagram />
                        </a>
                        <a href='/' className='bg-light shadow-md text-pri rounded-full text-lg  h-10 w-10 flex items-center justify-center'>
                            <AiOutlineYoutube />
                        </a>
                        <a href='/' className='bg-light shadow-md text-pri rounded-full text-lg h-10 w-10 flex items-center justify-center'>
                            <AiOutlineLinkedin />
                        </a>
                        <a href='/' className='bg-light shadow-md text-pri rounded-full text-lg h-10 w-10 flex items-center justify-center'>
                            <AiOutlineWhatsApp />
                        </a>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col items-start justify-start space-y-4'>
                    <h2 className='text-lg font-bold'>Tutorials</h2>
                    <a href="/">C++</a>
                    <a href="/">C Programming</a>
                    <a href="/">Python</a>
                    <a href="/">JavaScript</a>
                    <a href="/">NodeJS</a>
                    <a href="/">Redux</a>
                </div>
                <div className='col-span-1 flex flex-col items-start justify-start space-y-4'>
                    <h2 className='text-lg font-bold'>Trending Topics</h2>
                    <a href="/">How to complete DSA in 3 Months</a>
                    <a href="/">Learn Javascript only for frontend</a>
                    <a href="/">Python for AI and ML</a>
                    <a href="/">Encrypted Password using Express JS and JWT</a>
                    <a href="/">Responsive Amazon clone</a>
                    <a href="/">Multi level dropdown navbar fully responsive only with HTML and CSS</a>
                </div>
                <div className='lg:col-span-3 col-span-1 flex items-center justify-center'>
                    <span className='text-md text-text-muted text-center'>
                        Made with ❤️ by&nbsp;
                        <a href="www.instagram.com/ishanjarwal" target='_blank' className='text-pri font-bold'>@ishanjarwal</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
