"use client";
import AOS from 'aos';
import "aos/dist/aos.css";
import {useEffect} from 'react';

const AOSClient = () => {
    useEffect(() => {
        AOS.init({
          easing: "ease-out-cubic",
          once: false,
          offset: 50,
        });
      }, []);   
    return (
        <>
            
        </>
    );
}

export default AOSClient;