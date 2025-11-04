import Nav from '@/components/nav';
import ListPost from '@/components/Post/ListPost';
import { type SharedData, PageProps } from '@/types';
import { Post } from '@/types/post';
// import { PageProps } from '@inertiajs/core';
import { Head, Link, usePage } from '@inertiajs/react';

import React from 'react';

export default function Welcome({ auth, posts, canRegister }: PageProps<{ posts: Post[], canRegister: boolean }>) {
    return (
        <>
            <Head title='Welcome' />
            <div className="min-h-screen">
                <Nav />
                <div className="bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 dark:bg-gray-800">
                        <div className="text-center">
                            <h1 className="text-4xl font-black text-gray-800 dark:text-white sm:text-5xl md:text-6xl">
                                <span className="block">Bienvenue sur</span>
                                <span className="block text-indigo-700">Notre Blog Communautaire</span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-gray-500">
                                Partagez vos idées, découvrez des articles passionnants et connectez-vous avec une communauté dynamique de passionnés.
                            </p>
                            {!auth.user && canRegister && (
                                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 dark:bg-gray-800">
                                    <div className="rounded-md shadow-md">
                                        <Link href={('/register')} className='inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'>
                                            Commencer
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 dark:bg-gray-800">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">Articles Récents</h2>
                            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-800 dark:text-gray-400">Découvrez les dernières contributions de notre communauté passionnée.</p>
                        </div>
                    </div>
                    <ListPost posts={posts} />
                </div>
            </div>
        </>
    );
}
