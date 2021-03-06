import React from 'react';
import Layout from '../components/Layout/index';
import { toast } from 'react-toastify';

// State imports
import { useRecoilValue } from 'recoil';
import { userState } from '../authentication/state';

export default function Home() {
    const user = useRecoilValue(userState);

    const showToast = () => {
        toast.dark('😉 You know it!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    return (
       <>
        <Layout title="Home">
                <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                    {user.username? `Hi ${user.username}! ` : '' } Another <span className="text-indigo-600">NightKit</span> boilerplate.
                    
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Built with React and TailwindCSS. Uses JWT and Localstorage for authentication. Also, implements Shared State, thanks to <a href="https://recoiljs.org" className="text-indigo-600">Recoil by Facebook</a>.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                    <a href="https://github.com/nightkit/auth-with-jwt-tailwind-and-recoil/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        Visit Github
                    </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10" onClick={showToast}>
                        Credits
                    </button>
                    </div>
                </div>
                </div>
            </main>
        </Layout>
       </>
    )
}
