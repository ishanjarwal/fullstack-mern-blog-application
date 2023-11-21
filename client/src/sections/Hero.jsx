import React, { useState, useEffect } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { register } from 'swiper/element/bundle';
register();

const Hero = () => {

    const swiper_options = {
        'space-between': '0',
        'loop': true,
        'slides-per-view': '1',
        'free-mode': false,
        'pagination': true,
        'pagination-clickable': true,
        'autoplay-delay': '2500'
    }

    const data = [
        {
            "title": "10 Essential JavaScript Tricks Every Developer Should Know",
            "body": "In this tutorial, we'll explore ten essential JavaScript tricks and techniques to enhance your coding skills.",
            "author": "John Doe",
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBr2TYE4VitjxOl6IsFKqkCG6PgVZy0qUew1byMmSonscnOzD5aW2aHNOLXJSg-y5faA&usqp=CAU",
            "authorProfile": "https://example.com/author1.jpg",
            "date": "08-10-2023"
        },
        {
            "title": "Python Hacks: Tips for Writing More Efficient Code",
            "body": "Learn Python hacks and tricks to write cleaner, more efficient Python code that will save you time and headaches.",
            "author": "Jane Smith",
            "thumbnail": "https://cdn.analyticsvidhya.com/wp-content/uploads/2020/04/data-science-hacks-article.jpg",
            "authorProfile": "https://example.com/author2.jpg",
            "date": "15-09-2023"
        },
        {
            "title": "CSS Flexbox: A Complete Guide for Web Developers",
            "body": "Master CSS Flexbox layout and create responsive web designs with this comprehensive guide for web developers.",
            "author": "David Johnson",
            "thumbnail": "https://acciojob.com/blog/content/images/2023/02/Screenshot-2023-02-06-at-7.28.31-PM.png",
            "authorProfile": "https://example.com/author3.jpg",
            "date": "22-08-2023"
        },
        {
            "title": "SQL Injection Prevention: Best Practices for Security",
            "body": "Protect your web applications from SQL injection attacks with these best practices and security tips.",
            "author": "Emily Wilson",
            "thumbnail": "https://uploads.sitepoint.com/wp-content/uploads/2016/09/1473921124injection-attack.jpg",
            "authorProfile": "https://example.com/author4.jpg",
            "date": "05-07-2023"
        },
        {
            "title": "Beginner's Guide to Git and GitHub: Tips and Tricks",
            "body": "Get started with Git and GitHub and learn some essential tips and tricks to streamline your development workflow.",
            "author": "Michael Brown",
            "thumbnail": "https://res.cloudinary.com/practicaldev/image/fetch/s--oVyFGbtN--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7ce4oq75sia6ni6q46s3.png",
            "authorProfile": "https://example.com/author5.jpg",
            "date": "30-06-2023"
        },
        {
            "title": "JavaScript Promises: A Simplified Explanation",
            "body": "Understand JavaScript promises with a simplified explanation and examples to improve your async coding skills.",
            "author": "Lisa Turner",
            "thumbnail": "https://miro.medium.com/v2/resize:fit:2796/1*1Qg0RsRkXp0SdHLnVUwUDA.jpeg",
            "authorProfile": "https://example.com/author6.jpg",
            "date": "14-05-2023"
        },
        {
            "title": "Effective Debugging Techniques for JavaScript Developers",
            "body": "Learn effective debugging techniques for JavaScript and speed up your development process.",
            "author": "Samuel Mitchell",
            "thumbnail": "https://bairesdev.mo.cloudinary.net/blog/2021/03/Debbuging-techniques-and-their-role-in-software-development.png?tx=w_3840,q_auto",
            "authorProfile": "https://example.com/author7.jpg",
            "date": "02-04-2023"
        }
    ]

    return (
        <section className='hero flex items-center justify-center bg-background w-full pb-48 md:pt-20 pt-14'>
            <motion.div
                className='max-w-6xl w-full h-full xl:px-0 overflow-hidden rounded-none xl:rounded-lg'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: .3 }}
                viewport={{ once: true }}
            >
                <swiper-container {...swiper_options} >
                    {data.map((el, index) => (
                        <swiper-slide className="h-full" key={index}>
                            <a href="#" className='h-full'>
                                <div className='relative overflow-hidden w-full h-full bg-pri flex flex-col justify-end items-start p-8 md:pt-8 pt-16' style={{ "minHeight": "400px" }}>
                                    <div className='md:max-w-xl max-w-none w-full z-10 flex flex-col items-start justify-end md:space-y-4 space-y-2 '>
                                        <h1 className='md:text-5xl text-3xl text-light'>{el.title}</h1>
                                        <p className='md:text-xl text-md text-text-muted'>{el.body}</p>
                                        <span className='group md:text-xl text-md text-light border-b-2 border-pri w-min whitespace-nowrap flex items-center'>
                                            <span>Read Full Article</span>
                                            <span className='ms-2 group-hover:ms-4 duration-100' ><AiOutlineArrowRight /></span>
                                        </span>
                                    </div>
                                    <img src={el.thumbnail} className='absolute top-0 left-0 w-full h-full object-cover object-center' />
                                    <div className='absolute top-0 left-0 w-full h-full' style={{ "background": "linear-gradient(90deg, rgba(0,0,0,1) 35%, rgba(0,0,0,0.5) 100%)" }}></div>
                                </div>
                            </a>
                        </swiper-slide>
                    ))}
                </swiper-container>
            </motion.div>
        </section>
    )
}

export default Hero
