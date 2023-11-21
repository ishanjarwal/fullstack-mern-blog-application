import React from 'react'
import Card from '../components/Card'
import HorizontalCard from '../components/HorizontalCard'

const Saved = () => {

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
        <section className='w-full py-4'>
            <h1 className='text-3xl font-bold text-text mb-4 md:px-0 px-2'>Posts You Saved</h1>
            <div className='p-4 bg-light overflow-x-auto w-full rounded-lg shadow-lg grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {data.map((el, index) => {
                    return (
                        <HorizontalCard info={el} key={index} />
                    )
                })}
            </div>
        </section>
    )
}

export default Saved
