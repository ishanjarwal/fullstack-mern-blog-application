import React from 'react'
import ArticleListHome from '../sections/ArticleListHome'

const Category = () => {
    return (
        <section className='flex flex-col items-center justify-center md:pt-20 pt-14'>
            <div className='bg-background w-full py-12 pb-52 flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-center'>
                    Education
                </h1>
                {/* <h2>Oops!! No blogs in this category</h2> */}
            </div>
            <div className='w-full max-w-6xl'>
                <ArticleListHome />
            </div>
        </section>
    )
}

export default Category
