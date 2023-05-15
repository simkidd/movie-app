import React, { useEffect, useState } from 'react'
import {RiArrowUpSLine} from 'react-icons/ri';
import styled from 'styled-components';

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(()=>{
        const toggleShow =()=>{
            if(window.pageYOffset > 2000){
                setShowButton(true)
            }else{
                setShowButton(false)
            }
        };

        document.addEventListener('scroll', toggleShow);
        return ()=>{
            document.removeEventListener('scroll', toggleShow)
        }
    },[])


    const scrollToTop =()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

  return (
    <Button onClick={scrollToTop} className={`${showButton ? 'show' : ''}`}>
        <RiArrowUpSLine size={22} />
    </Button>
  )
}

export default ScrollToTop

const Button = styled.button`
    background: #ff0000;
    color: #fff;
    transition: all .2s ease-in-out;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 6px;
    padding: 0.25rem;
    border: none;
    z-index: 999;
    box-shadow: 0px 0px 7px 5px #ff00004d;
    opacity: 0;
    &:hover {
        box-shadow: 0px 0px 7px 8px #ff00004d;
    }
    &.show{
        opacity: 1;
    }
`