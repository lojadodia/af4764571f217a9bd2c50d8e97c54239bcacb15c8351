import CookieConsent from "react-cookie-consent";
import { useSettings } from "@contexts/settings.context";
import { useUI } from "@contexts/ui.context";

import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { FaMoneyBillWave } from "react-icons/fa";

const Footer = () => {
  const settings = useSettings();
  let dark = "";
  let separator = "";
  if(settings?.env?.THEME == "dark"){
    dark = "dark";
    separator = "-";
  }
  const { openModal, setModalView } = useUI();

  function handleJoin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleSign() {
    setModalView("REGISTER");
    return openModal();
  }

  
  return (
    <div>  
    <div className="flex-grow dark:bg-neutral-900 lg:pt-5">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto 0 px-5 xl:px-8 2xl:px-14 " style={{opacity:"0.8"}}>
        <div className="flex-col py-3 w-full hidden lg:block">
          <ul>
            <li className="py-2 text-sm text-gray-500 dark:text-neutral">{settings?.siteTitle}</li>
            <li className="py-2 text-sm"><a href="/checkout" className="text-gray-700 dark:text-neutral">Carrinho</a></li>
            <li className="py-2 text-sm"><a href="/orders" className="text-gray-700 dark:text-neutral">Meus Pedidos</a></li>
            <li className="py-2 text-sm"><a href="/help" className="text-gray-700 dark:text-neutral">Ajuda - Perguntas Frequentes </a></li>
            <li className="py-2 text-sm"><a href="/contact" className="text-gray-700 dark:text-neutral">Contatos</a></li>
          </ul>
        </div>
        <div className="flex-col py-3 w-full hidden lg:block">
          <ul>

              <li className="py-2 text-sm text-gray-500 dark:text-neutral">Descubra</li>
              <li className="py-2 text-sm"><a href="#regista" onClick={handleSign} className="text-gray-700 dark:text-neutral">Crie uma conta </a></li>
              <li className="py-2 text-sm"><a href="#login" onClick={handleJoin} className="text-gray-700 dark:text-neutral">Fazer Login</a></li>
              <li className="py-2 text-sm"><a href="https://www.lojadodia.com/#Subscrever" className="text-gray-700 dark:text-neutral">Aderir a Lojadodia</a></li>
              <li className="py-2 text-sm"><a target="_blank" href="https://lojadodia.com" className="text-gray-700 dark:text-neutral">Loja do Dia | Business</a></li>

          </ul>
        </div>
          <div className="flex-col py-3 w-full">
            <ul>
            <li className="py-2 text-sm text-gray-500 dark:text-neutral">Formas de Pagamento</li>
              <div className="flex-col py-1  w-full ">
                <ul>
                  <li className="py-2 text-gray-500 flex flex-row">
                    {settings?.env?.SHIPPING_COUNTRY == "BR" ? (
                      <>
                        <div className="mr-4" style={{width:'70px'}} >
                          <img src={`/img/${dark+separator}payment/pix.png`} className="inline-block"/>
                        </div>
                        <div className="mr-4" style={{width:'46px'}} >
                          <img src={`/img/${dark+separator}payment/boleto.png`} className="inline-block"/>
                        </div>
                      </>
                    ): (
                      <>
                      {settings?.env?.PAYMENT_MBWAY != false && (
                        <div className="mr-4" style={{width:'50px'}} >
                          <img src={`/img/${dark+separator}payment/mbway.png`} className="inline-block"/>
                        </div>
                      )}
                        {settings?.env?.PAYMENT_MB != false && (
                        <div className="mr-4" style={{width:'80px'}} >
                          <img src={`/img/${dark+separator}payment/mb.png`} className="inline-block"/>
                        </div>
                         )}
                      </>
                    )}
                    
                    {settings?.env?.PAYMENT_STRIPE != false && (
                      <div className="mr-4" style={{width:'70px'}} >
                        <img src={`/img/${dark+separator}payment/card.png`} className="inline-block"/>
                      </div>
                    )}

                    {settings?.env?.PAYMENT_CASH != false && (
                      <div className="mr-4 text-sm font-semibold mt-1 text-black dark:text-white" style={{width:'70px',opacity:0.8}} >
                        DINHEIRO
                      </div>
                    )}
                    {settings?.env?.SHIPPING_COUNTRY == "BR" ? (
                      <>
                        <div className="mr-4" style={{width:'103px'}} >
                          <a href={settings?.site?.complaints} target="_blank">
                            <img src={`/img/${dark+separator}payment/reclame-aqui.png`} className="inline-block"/>
                          </a>
                        </div>
                      </>
                    ): (
                      <>
                        <div className="mr-4 -mt-2" style={{width:'103px'}} >
                          <a href={settings?.site?.complaints} target="_blank">
                            <img src={`/img/${dark+separator}payment/livro-reclamacoes.png`} className="inline-block"/>
                          </a>
                        </div>
                      </>
                    )}
                    
                  </li>
                </ul>
              </div>
              <li className="py-2 text-sm text-gray-500 dark:text-neutral">Siga-nos</li>
              <li className="py-2">
                <div className="flex items-center justify-start">
                  <a target="_blank" href={settings?.site?.instagram} className="text-gray-700 dark:text-neutral text-sm focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-instagram"><svg data-name="Group 96" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 12 12"><path data-name="Path 1" d="M8.5 1A2.507 2.507 0 0111 3.5v5A2.507 2.507 0 018.5 11h-5A2.507 2.507 0 011 8.5v-5A2.507 2.507 0 013.5 1h5m0-1h-5A3.51 3.51 0 000 3.5v5A3.51 3.51 0 003.5 12h5A3.51 3.51 0 0012 8.5v-5A3.51 3.51 0 008.5 0z" fill="currentColor"></path><path data-name="Path 2" d="M9.25 3.5a.75.75 0 11.75-.75.748.748 0 01-.75.75zM6 4a2 2 0 11-2 2 2 2 0 012-2m0-1a3 3 0 103 3 3 3 0 00-3-3z" fill="currentColor"></path></svg></a>
                  <a target="_blank" href={settings?.site?.facebook} className="text-gray-700 dark:text-neutral text-sm focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 12 12"><path data-name="_ionicons_svg_logo-facebook (6)" d="M11.338 0H.662A.663.663 0 000 .663v10.674a.663.663 0 00.662.662H6V7.25H4.566V5.5H6V4.206a2.28 2.28 0 012.459-2.394c.662 0 1.375.05 1.541.072V3.5H8.9c-.753 0-.9.356-.9.881V5.5h1.794L9.56 7.25H8V12h3.338a.663.663 0 00.662-.663V.662A.663.663 0 0011.338 0z" fill="currentColor"></path></svg></a>
                  <a target="_blank" href={settings?.site?.twitter} className="text-gray-700 dark:text-neutral text-sm focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 14.747 12"><path data-name="_ionicons_svg_logo-twitter (5)" d="M14.747 1.422a6.117 6.117 0 01-1.737.478A3.036 3.036 0 0014.341.225a6.012 6.012 0 01-1.922.734 3.025 3.025 0 00-5.234 2.069 2.962 2.962 0 00.078.691A8.574 8.574 0 011.026.553a3.032 3.032 0 00.941 4.044 2.955 2.955 0 01-1.375-.378v.037A3.028 3.028 0 003.02 7.225a3.046 3.046 0 01-.8.106 2.854 2.854 0 01-.569-.056 3.03 3.03 0 002.828 2.1 6.066 6.066 0 01-3.759 1.3 6.135 6.135 0 01-.722-.044A8.457 8.457 0 004.631 12a8.557 8.557 0 008.616-8.619c0-.131 0-.262-.009-.391a6.159 6.159 0 001.509-1.568z" fill="currentColor"></path></svg></a>
                  <a target="_blank" href={settings?.site?.youtube} className="text-gray-700 dark:text-neutral text-sm focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-youtube"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 15.997 12"><path d="M15.893 2.65A2.429 2.429 0 0013.581.113c-1.731-.081-3.5-.112-5.3-.112h-.563c-1.8 0-3.569.031-5.3.112A2.434 2.434 0 00.106 2.656C.028 3.768-.006 4.881-.003 5.993s.031 2.225.106 3.34a2.437 2.437 0 002.309 2.547c1.822.085 3.688.12 5.584.12s3.759-.031 5.581-.119a2.438 2.438 0 002.312-2.547c.075-1.116.109-2.228.106-3.344s-.027-2.225-.102-3.34zM6.468 9.059v-6.14l4.531 3.069z" fill="currentColor"></path></svg></a> 
                </div>
              </li>
            
            </ul>
          </div>
        <div className="flex-col  w-full">
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto 0 px-5 xl:px-8 2xl:px-14">
        <div className="flex-col  w-full">
        </div>
        <div className="flex-col  w-full">
        </div>
      </div>
      <div className="flex flex-col max-w-7xl w-full mx-auto py-5 px-5  xl:px-8 2xl:px-14">
        <hr className="border-rgb dark:border-neutral-700"/>
      </div>
      <div className="flex pb-5 flex-col md:flex-row max-w-7xl w-full mx-auto 0 px-5 xl:px-8 2xl:px-14" >
        
        <div className=" flex-col  w-full ">
          <ul>
            <li className="py-0 text-sm-center text-lg-left text-md-center" style={{fontSize:"11pt"}}>
              <a target="_blank" href="https://lojadodia.com" className="text-gray-700 dark:text-neutral" style={{opacity:"0.7"}}>
              <small>
                Todos os Direitos reservados © 2022, <span className="uppercase">{settings?.siteTitle} - {settings?.site?.company}</span>, com sede {settings?.site?.company_address}, Contribuinte n.º {settings?.site?.fiscal}.
              </small>
              </a>
            </li>
            <li className="py-4 text-sm-center text-lg-left text-md-center" style={{fontSize:"11pt"}}>
              <a target="_blank" href="https://lojadodia.com" className="text-gray-700 dark:text-neutral">
              <small className="flex">
                <i>Desenvolvido por</i>  <img style={{width:"100px"}} src={`/${dark+separator}logo-lojadodia.png`} alt="" /> │  www.lojadodia.com
              </small>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-col  pb-10 w-full text-center text-lg-right text-md-right" style={{opacity:"0.7"}}>
          <a href="/terms" className="text-gray-700 dark:text-neutral px-5"> <small>Termos e Condições </small></a> <small>│</small>
          <a href="/privacy" className="text-gray-700 dark:text-neutral px-5"> <small>Privacidade </small></a> <small>│</small>
          <a href="/refund" className="text-gray-700 dark:text-neutral px-5"> <small>Reembolsos </small></a> <small>│</small>
          <a href={settings?.site?.complaints} target="_blank" className="text-gray-700 dark:text-neutral px-5"> <small>Reclamações </small></a>
        </div>

      </div>
      <div className="lg:hidden md:hidden py-8"></div>
    </div>
      <CookieConsent
        location="bottom"
        buttonText="Eu aceito"
        cookieName="myAwesomeCookieName2"
        style={{ background: `rgba(0,0,0,.900)` }}
        buttonStyle={{ color: '#fff',background: '#165df5', fontSize: "13px",borderRadius:'5px' }}
        expires={150}
      >
        {/* (settings?.site?.color) <div className="flex-grow">
            <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto 0 px-5 xl:px-8 2xl:px-14">
              <div className=" flex-col py-5  w-full "> */}
                🍪 Cookies de navegação {" "} <br />
                <span style={{ fontSize: "10px" }}>Este website utiliza cookies que visam melhorar o desempenho e a experiência de navegação dos nossos clientes/utilizadores. Pode consultar mais informações na nossa <a href=""><u>Politica de Privacidade</u></a>. </span>
        {/* </div> </div> </div> */}
      </CookieConsent>
    </div>
    
  );
};

export default Footer;
