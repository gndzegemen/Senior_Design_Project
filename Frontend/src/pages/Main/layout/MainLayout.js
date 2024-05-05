
import { Sidebar, Header } from '../components';
import React from 'react'
import { StatusProvider } from "../../../context/statusContext";

export const MainLayout = ({ children }) => {
    return (

        
            <div className="relative sm:-8 p-4 bg-white min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
            </div>

            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                
                
                <StatusProvider>
                <Header />
                {children}
                </StatusProvider>
           
            </div>
        </div>
      
    );
};