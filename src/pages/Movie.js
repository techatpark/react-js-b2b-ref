import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/index';


import { checkToken, fetchToken } from '../authentication/utils';
import * as serverConfig from '../authentication/server-config';
import { Formik } from 'formik';
// import { _ } from "gridjs-react";

// State imports
import { RecoilRoot, useRecoilState } from 'recoil';
import { movies } from '../authentication/state';

import { Grid, _ } from 'gridjs-react';
export default function Movie() {
    const [_movies, setMovies] = useState([])
    const [_movie, setMovie] = useState({});
    const [isEditMode, setMode] = useState(false);

    useEffect(() => {
        setMovie({
            "title": "",
            "directedBy": "",
            "yearOfRelease": 0,
            "rating": 0,
            "genre": "",
            "imdbId": ""
        })
    }, [])


    const createMove = (data, callBack, method) => {

        const token = fetchToken();
        const url  = serverConfig.serverURL + serverConfig.routes.movies + (data.id ? `/${data.id}`:"" )
        fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                callBack(true)
                console.log(res);
            });

    }
    const handleSubmit = (values, { setSubmiting }) => {
        // console.log(values)
        createMove(values, setSubmiting , values.id ? "PUT":"POST");
    }
    const renderForm = () => {
        return (<Formik
            initialValues={_movie}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                <form onSubmit={handleSubmit} className="mt-8">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="Name" name="title" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Name" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                        </div>
                        {errors.title && touched.title && errors.title}
                        <div>
                            <input aria-label="directedBy" name="directedBy" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="directedBy" onChange={handleChange} onBlur={handleBlur} value={values.directedBy} />
                        </div>
                        {errors.directedBy && touched.directedBy && errors.directedBy}
                        <div className="-mt-px">
                            <input aria-label="yearOfRelease" name="yearOfRelease" type="number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="yearOfRelease" onChange={handleChange} onBlur={handleBlur} value={values.yearOfRelease} />
                            {errors.yearOfRelease && touched.yearOfRelease && errors.yearOfRelease}
                        </div>
                        <div className="-mt-px">
                            <input aria-label="rating" name="rating" type="number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="rating" onChange={handleChange} onBlur={handleBlur} value={values.rating} />
                            {errors.rating && touched.rating && errors.rating}
                        </div>
                        <div className="-mt-px">
                            <input aria-label="genre" name="genre" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="genre" onChange={handleChange} onBlur={handleBlur} value={values.genre} />
                            {errors.genre && touched.genre && errors.genre}
                        </div>
                        <div className="-mt-px">
                            <input aria-label="imdbId" name="imdbId" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="imdbId" onChange={handleChange} onBlur={handleBlur} value={values.imdbId} />
                            {errors.imdbId && touched.imdbId && errors.imdbId}
                        </div>

                    </div>

                    <div className="mt-6">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" disabled={isSubmitting}>
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {isSubmitting ? "creating..." : "Submit"}
                        </button>
                    </div>
                </form>
            )}
        </Formik>);
    }
    const editRecord = (d) => {
        setMovie(d);
        setMode(true);
    }
    const renderButton = (d) => {
        return (<button className={"py-2 mb-4 px-4  rounded-md text-white bg-blue-600"} onClick={() => editRecord(d)}>Edit </button>)
    }
    const renderList = () => {
        return (<Grid
            pagination={{
                enabled: true,
                limit: 5,
                server: { url: (prev, page, limit) => `${prev}?size=${limit}&page=${page + 1}` }
            }}
            columns={['title', 'directedBy', 'genre', 'imdbId', , "yearOfRelease", "rating", 'Actions']}
            server={{
                url: serverConfig.serverURL + serverConfig.routes.movies,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${fetchToken().token}`
                },
                then: data => data.content.map(d => {
                    return [
                        d.title,
                        d.directedBy, d.genre, d.imdbId, d.yearOfRelease, d.rating, _(renderButton(d))
                    ];
                }),
                total: data => data.totalElements
            }}

        />);
    }
    return (
        <Layout title="Movie" auth={false}>
            <div className='w-5/6'>
                {
                    isEditMode ? renderForm() : renderList()
                }
            </div>
            <button onClick={() => setMode(!isEditMode)} className={`absolute k_button py-2 mb-4 px-4  rounded-md ${isEditMode ? "text-black bg-gray-600" : "text-white bg-blue-600"}`}>
                {isEditMode ? "cancel" : "Add record"}
            </button>

        </Layout>
    )
}
