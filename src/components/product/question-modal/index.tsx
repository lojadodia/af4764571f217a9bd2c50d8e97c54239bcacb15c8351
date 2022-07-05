import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './SimpleModal.module.css';
import Cookies from 'js-cookie';

const SimpleModal = () => {
    const [showModal, setShowModal] = useState(false);
    const buttonRef = useRef(null);
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const p2Ref = useRef(null);
    const backgroundRef = (null);
    const componentRef = (null);

    const displayNotAlcohol = () => {
        if(buttonRef.current) {
            buttonRef.current.style.display = 'none';
            if(h1Ref.current && h2Ref.current && p2Ref.current) {
                h2Ref.current.innerText = 'ACESSO NEGADO';
                h1Ref.current.innerText = 'O teu acesso está restrito por causa da sua idade';
                p2Ref.current.innerText = 'Poderá acessar e comprar outros produtos do site que não contenham álcool';
            };
        };
    };

    const notAlcohol = () => {
        Cookies.set('alcohol', 'false');
        displayNotAlcohol();
    };

    useEffect(() => {
            if(Cookies.get('alcohol') === 'false') {
                displayNotAlcohol();
            }
    }, []);

    const trueAlcohol = () => {
        Cookies.set('alcohol', 'true');
        setShowModal(!showModal);
    };
  
    return (
        <>
            {!showModal &&

            
        <div className="fixed inset-0 bg-black bg-opacity-85 w-full h-full" ref={backgroundRef} >
              <div className="min-h-full md:p-5 text-center relative">
        <span className="responsive-center-modal inline-block h-screen align-middle" aria-hidden="true">&nbsp;</span>
            <div className="inline-block min-w-content max-w-full text-left align-middle transition-all md:rounded-xl relative" >
                <div className="py-6 px-5 sm:p-8 bg-white dark:bg-neutral-800 rounded-lg w-screen md:max-w-md mx-auto h-screen md:h-auto flex flex-col justify-center  dark:border-neutral-700 border" ref={componentRef}>
                    <div className="flex justify-center">
                    <a className="inline-flex" href="/">
                        <span className="overflow-hidden relative">
                            <div></div>
                        </span>
                    </a>
                    </div>
                    <p className="text-center text-sm dark:text-gray md:text-base text-body mt-4 sm:mt-5 mb-5 sm:mb-5">Decreto-Lei nº. 50/2013</p>



            <div className={styles.content}>
                <div className={styles.message}>
            <h1 ref={h2Ref} className={styles.access}></h1>
            <h1 ref={h1Ref} className="text-center text-2xl dark:text-gray  text-body  font-semibold">Tem idade legal para o consumo de álcool?</h1>
            <p ref={p2Ref} className="text-center text-sm dark:text-gray md:text-base text-body  mt-4 mb-4 "></p> 
                </div>
                <div className="flex space-x-2" ref={buttonRef}>
            <button className="inline-flex items-center rounded justify-center flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-primary text-white border border-transparent hover:bg-primary-2 px-10 py-0 h-12  h-11 sm:h-12 border-2 bg-black dark:bg-black" onClick={notAlcohol}>Não</button>
            <button className="inline-flex items-center rounded justify-center flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-primary text-white border border-transparent hover:bg-primary-2 px-10 py-0 h-12  h-11 sm:h-12 border-2 bg-primary" onClick ={trueAlcohol}>Sim</button>
                </div>
            </div>




           
         </div>
      </div>

        </div>

     
        </div>
         }
        </>
    )
}

export default SimpleModal;