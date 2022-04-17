
import { useEffect, useState, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import Address from "@components/address/address";
import Schedule from "@components/checkout/schedule";
import Layout from "@components/layout/layout";
import VerifyCheckout from "@components/checkout/verify-checkout";
import { useUI } from "@contexts/ui.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useSettings } from "@contexts/settings.context";
import { useCheckout } from "@contexts/checkout.context";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiTruckFill, RiShoppingBag3Fill, RiTimeLine, RiCalendar2Fill, RiMapPin2Fill, RiExternalLinkLine, RiAlertFill } from "react-icons/ri";
import { useCart } from "@contexts/quick-cart/cart.context";
import http from '@utils/api/http'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { generateCartItem } from "@contexts/quick-cart/generate-cart-item";
// check-offer
    // amount
    // 
 
registerLocale('ptBR', ptBR);
interface FormValues {
  obs: string;
}

const AnyReactComponent = ({ children }: any) => <div>{children}</div>;
export default function CheckoutPage() {
  const { data, refetch } = useCustomerQuery();
  const [checkNow, setCheckANow] = useState(true);
  const [checkSchedule, setCheckSchedule] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [times, setTimes] = useState(null)
  const [weekName, setWeekName] = useState("");
  const datePickerRef = useRef(null);
  const hourPickerRef = useRef(null)
  const [timeInterval, setTimeInterval] = useState(-1);
  const [selectedDate, setSelectedDate] = useState("");
  const [includeTimes, setIncludeTimes] = useState<Date[]>([])
  const { updateDeliveryTime, updateDeliverySchedule, order_type, setOrderType, updateObs } = useCheckout();
  const { isAuthorize, openModal, setModalView, setModalData } = useUI();
  const { total, isEmpty, addItemToCart,clearItemFromCart, isInCart } = useCart();
  
  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33
  });
  const handleKeyDown = (e: any) => {
    e.preventDefault();
  };
  const settings: any = useSettings();

  const type = "billing";
  var currentHour = moment(Date.now()).format('HH:mm');
  const currentTime = settings?.schedule[moment(Date.now()).format('dddd').toLocaleLowerCase()];

  useEffect(() => {

    if (isAuthorize) {
      if (order_type) return
      if (settings?.order?.type?.takeaway == 'true' && settings?.order?.type?.delivery == 'true') {
        setModalView("ORDER_TYPE");
        setModalData(settings?.site?.color);
        return openModal();
      } else if (settings?.order?.type?.takeaway == 'true' && settings?.order?.type?.delivery == 'false') {
        setOrderType('takeaway')
      } else if (settings?.order?.type?.takeaway == 'false' && settings?.order?.type?.delivery == 'true') {
        setOrderType('delivery')
      } else {
        setOrderType(null)
      }

    } else {
      setModalView("LOGIN_VIEW");
      return openModal();
    }
    
  }, [isAuthorize, order_type]);
  useEffect(() => {

    if (!isEmpty) {
      http.post(`${API_ENDPOINTS.CHECK_OFFER}`, {
        order_type: order_type,
        amount: total
      }).then(res => res.data).then((data ) => {
        
        if (data.product) {
          const item = generateCartItem(data.product)
          item.id = `${item.id}.offer`
          clearItemFromCart(item.id)

         
            item.price = 0
            addItemToCart(item, data.qty)
            setModalView("PRODUCT_OFFER")
            setModalData({ item, offer: data.offer})
            openModal()
          
        }
      })
      
    }
  }, [order_type, total, isEmpty])
  const mapDark = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]},
    { featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]},
    { featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]},
    { featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]},
    { featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]},
    { featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]},
    { featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]},
    { featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]},
    { featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]},
    { featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]},
    { featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }]},
    { featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]},
    { featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]},
    { featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]},
    { featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]}
  ];


  useEffect(() => {
    refetch().then(res => {
      if (isAuthorize) {
        if (order_type === 'delivery') {
          const address = res.data?.me?.address;
          if (address?.length === 0) {
            setModalData({ customerId: res.data?.me?.id!, type });
            setModalView("ADD_OR_UPDATE_ADDRESS")
            return openModal();

          }
          setTimeInterval(currentTime?.interval)
        }else{
          setTimeInterval(currentTime?.interval2)
        }
      }

    });
  }, [isAuthorize, order_type])

  useEffect(() => {
    setCenter({ lat: settings?.site.address_lat, lng: settings?.site.address_lng })
  }, [settings?.site]);

  useEffect(() => {

    if (isDateValid()) {
      optionChecked("now");
      if(order_type == "delivery"){
        setTimeInterval(currentTime?.interval)
      }else{
        setTimeInterval(currentTime?.interval2)
      }
      
    } else {
      optionChecked("schedule");
    }

  }, []);
  function onOpenOrderType() {
    setModalView("ORDER_TYPE");
    setModalData(settings?.site?.color);
    return openModal();
  }

  function isDateValid () {
    const _weekName = moment(date).format('dddd').toLocaleLowerCase();
    // Intervalo
    const interval = order_type != "takeaway" ? settings?.schedule[_weekName]?.interval : settings?.schedule[_weekName]?.interval2;
    // Limites
    const end1 = currentTime?.time1?.end;
    const end2 = currentTime?.time2?.end;
    // Converter em datas validas
    const date1 = moment(moment().format("YYYY-MM-DD")+"T"+end1+":00");
    const date2 = moment(moment().format("YYYY-MM-DD")+"T"+end2+":00");
    // Subtrair Minutos
    const endtime1 = interval ? moment(date1).subtract(interval, "minutes").format("HH:mm") : end1;
    const endtime2 = interval ? moment(date2).subtract(interval, "minutes").format("HH:mm") : end2;
    // Filtrar
    let currentDayWeek = settings.schedule[moment(settings.now).format('dddd').toLocaleLowerCase()].value
    return ((currentHour >= currentTime?.time1?.start && currentHour <= endtime1) || 
    (currentHour >= currentTime?.time2?.start && currentHour <= endtime2) ) && currentDayWeek
  }
  var date = new Date();
  var start = new Date();

  const { register } = useForm<FormValues>({});

  if (settings?.scheduleType == "client-by") {
    if (settings?.site?.delivery_time > 0) {
      date.setDate(date.getDate() + Number(settings?.site?.delivery_time));
      start.setDate(start.getDate() + Number(settings?.site?.delivery_time));
    }
  }


  const handleOnChange = (date: any) => {
    setStartDate(date!);
    // comentei updateDeliverytime porque adicionei no input de time, neste caso
    // a data só será actualizada quando a hora for actualizada
    // updateDeliveryTime(moment(date).format("DD-MM-YYYY HH:mm"));
    const _weekName = moment(date).format('dddd').toLocaleLowerCase()
    setWeekName(_weekName)
    setSelectedDate(moment(date).format('DD-MM-YYYY'))
    setTimes(null)
    updateDeliveryTime(null);
    const time1 = settings?.schedule[_weekName]?.time1
    const time2 = settings?.schedule[_weekName]?.time2
    const tinterval = settings?.schedule[_weekName]?.interval

    if (!time1 && !time2) return setIncludeTimes([])
    const currentDate = moment(settings?.now)
   
    const timesCalc = createSequenceOfTimesDelivery(time1, tinterval, Object.assign(currentDate), moment(date).format('DD-MM-YYYY'))
      .concat(createSequenceOfTimesDelivery(time2, tinterval, Object.assign( currentDate), moment(date).format('DD-MM-YYYY')))
    setIncludeTimes(timesCalc)
    if (!timesCalc.length) {
      return toast.info('Já não estamos a aceitar encomendas para hoje. Por-favor escolha uma data futura para agendar.',
      {
        autoClose: 12000
      })
    }
    const timeId = setTimeout(() => {
      hourPickerRef.current.setFocus();

      clearTimeout(timeId)
    }, 200)
  };
  function handlerTime(time: any) {
    setTimes(time)
    const datetime = moment(selectedDate + ' ' + moment(time).format('HH:mm'), 'DD-MM-YYYY HH:mm');

    updateDeliveryTime(moment(datetime).format("DD-MM-YYYY HH:mm"));
  }
  
  
  function saveObs(event: any) {
    updateObs(event.target.value);
  }


  const isWeekday = (date: Date) => {

    const day = date.getDay()

    var sunday = 8;
    var monday = 8;
    var tuesday = 8;
    var wednesday = 8;
    var thursday = 8;
    var friday = 8;
    var saturday = 8;


    if (settings?.schedule?.sunday.value != true) {
      var sunday = 0;
    }
    if (settings?.schedule?.monday.value != true) {
      var monday = 1;
    }
    if (settings?.schedule?.tuesday.value != true) {
      var tuesday = 2;
    }
    if (settings?.schedule?.wednesday.value != true) {
      var wednesday = 3;
    }
    if (settings?.schedule?.thursday.value != true) {
      var thursday = 4;
    }
    if (settings?.schedule?.friday.value != true) {
      var friday = 5;
    }
    if (settings?.schedule?.saturday.value != true) {
      var saturday = 6;
    }


    return day !== sunday && day !== monday && day !== tuesday && day !== wednesday && day !== thursday && day !== friday && day !== saturday
  };

  const optionChecked = (option: string, action?: string) => {
    const date: any = new Date();
    switch (option) {
      case "now":
        setStartDate(date!);
        updateDeliveryTime(moment(date).format("DD-MM-YYYY HH:mm"));
        setCheckANow(true);
        setCheckSchedule(false);
        if(order_type == "delivery"){
          setTimeInterval(currentTime?.interval)
        }else{
          setTimeInterval(currentTime?.interval2)
        }
        updateDeliverySchedule("now")
        break;
      case "schedule":
        setStartDate(null);
        setCheckSchedule(true);
        updateDeliveryTime(null);
        setCheckANow(false);
        updateDeliverySchedule("schedule")
        
        const timeId = setTimeout(() => {
          action && datePickerRef.current.setFocus();
          clearTimeout(timeId)
        }, 200)
        break;

    }
  }



    function createSequenceOfTimesDelivery(time1: { start: string; end: string },
    tinterval: any, currentDate: any, selectDate: string) {
      let currentDate2 = moment(currentDate)
      const _time1 = new Date(currentDate);
      const aux = []
      var startAuxTimes = time1?.start.split(':')
      var hourStart1 = parseInt(startAuxTimes[0], 10)
      var minuteStart1 = parseInt(startAuxTimes[1], 10)
      let [hourEnd1, minuteEnd1] = time1?.end.split(':')
      
      //setTimeInterval(null)
      
      var auxH1 = parseInt(moment(currentDate2).format('HH'), 10);
      var auxM1 = parseInt(moment(currentDate2).format('mm'), 10);
      
      // if (auxH1 >= parseInt(endAuxTimes2[0], 10) && auxM1 >= parseInt(endAuxTimes2[1], 10)) return []
      
      // condição para o dia actual
    
      if (selectDate == currentDate.format('DD-MM-YYYY')) {
        if (auxH1 >= hourStart1) {
          currentDate2.add(tinterval, 'm')
        }
        //setTimeInterval(currentTime?.interval)


        auxH1 = parseInt(moment(currentDate2).format('HH'), 10);
        auxM1 = parseInt(moment(currentDate2).format('mm'), 10);
        // quando a hora actual for maior do hora de fechar, retorna o array vazio
       
        if (auxH1 > parseInt(hourEnd1, 10)) return []

        // se hora actual é maior do que hora de entrada, actualiza hora de entrada
        if (auxH1 > hourStart1) {
          hourStart1 = auxH1
        }

        // se minuto actual é maior do que minuto de entrada, actualiza o minuto de entrada de pedido
        if (auxM1 > minuteStart1) {
          minuteStart1 = auxM1
        }

        if (auxH1 < hourStart1) {
          minuteStart1 = parseInt(time1.start.split(':')[1], 10)
        }
        
        else if (minuteStart1 >= 0 && minuteStart1 <= 15) {
          minuteStart1 = 15;
        } else if (minuteStart1 > 15 &&  minuteStart1 <= 30) {
          minuteStart1 = 30;
        } else if (minuteStart1 > 30 && minuteStart1 <= 45) {
          minuteStart1 = 45;
        } else if (minuteStart1 > 45 && minuteStart1 <= 59) {
          if (hourStart1 != 23) {
            hourStart1 = parseInt(moment(currentDate).add(1, 'hours').format('HH'), 10);
            minuteStart1 = 0;
          }
          
        }
      }
    _time1.setHours(hourStart1)
    _time1.setMinutes(minuteStart1)
    _time1.setSeconds(0)

    const time_aux = moment(new Date(_time1))

    for (let i = 0; i < 180; i++) {

      if (time_aux.hour() < hourStart1 || time_aux.hour() > parseInt(hourEnd1, 10)) continue

      if (time_aux.hour() == parseInt(hourEnd1, 10) && time_aux.minute() > parseInt(minuteEnd1, 10)) continue

      aux.push(new Date(time_aux.toString()))
      time_aux.add(15, 'm')

    }
   
    return aux
  }
  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">

      <div className="flex flex-col lg:flex-row items-center lg:items-start m-auto lg:space-x-8 w-full max-w-5xl">

        <div className="lg:max-w-2xl w-full space-y-6">

          {(settings?.order?.type?.takeaway == 'false' && settings?.order?.type?.delivery == 'false') ? (
            <div className="bg-yellow-100 mt-5 border-t-4 dark:text-neutral-800 border-yellow-300 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert" style={{ borderColor: '#FBBF24' }}>
              <div className="flex">
                <div className="py-1">
                  <RiAlertFill className="fill-current h-8 w-8 text-teal-500 mr-4" style={{ display: "inline-block", verticalAlign: '-2px' }} />
                </div>
                <div>
                  <p className="font-bold">De momento não estamos a aceitar encomendas no nosso site</p>
                  <p className="text-sm">Pedimos a compreensão de todos. Por motivos técnicos o nosso site encontra-se no momento em atualização para que possa encomendar no conforto da sua casa com praticidade e segurança.</p>
                </div>
              </div>
            </div>

          ) : (
            <>
              {
                order_type && (order_type != 'takeaway' ? (
                  <div  className="relative">
                    <div className="absolute" id="target-address" style={{marginTop: '-96px'}}></div>
                    <div className="shadow-700 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-5 md:p-8">

                      <Address
                        id={data?.me?.id!}
                        heading="Local de Entrega"
                        addresses={data?.me?.address?.filter(
                          (address: any) => address.type === "billing"
                        )}
                        count={1}
                        type="billing"
                      />


                    </div>
                    <div className="flex justify-between mt-2">
                      <p><small></small></p>
                      {settings?.order?.type?.takeaway == 'true' && settings?.order?.type?.delivery == 'true' && (
                        <div className="rounded px-4 mt-3 text-white  bg-primary  py-2 text">
                          <span role="button" className="text-xs" onClick={onOpenOrderType}> ALTERAR ENTREGA / TAKEAWAY</span>
                        </div>
                      )}
                    </div>

                  </div>

                ) : (

                  <div>

                    <div className="shadow-700 bg-white border dark:bg-neutral-800 dark:border-neutral-700 rounded-lg p-5 md:p-8">

 
                      <div className="flex items-center justify-between mb-4 md:mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <span className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-base lg:text-xl text-white">1</span>
                          <p className="text-lg lg:text-xl text-heading dark:text-white"><span className="hidden sm:inline-block sm:ml-1">Local de&nbsp;</span>Levantamento</p>
                        </div>
                        <a href={`https://www.google.com/maps/dir//${settings?.site.address_lat},${settings?.site.address_lng}`} target="_blank">
                          <button className="flex items-center text-sm font-semibold text-primary transition-colors duration-200 focus:outline-none focus:text-primary-2 hover:text-primary-2">

                            <RiExternalLinkLine style={{ display: "inline-block", verticalAlign: '-2px' }} /><span className="hidden sm:inline-block sm:ml-1">Abrir no&nbsp;</span>
                            Mapa
                          </button>
                        </a>
                      </div>

                      {settings?.site && (<div style={{ height: '220px', width: '100%' }}>
                        <GoogleMapReact
                          bootstrapURLKeys={{ key: 'AIzaSyDLxesZSWwDMbCq7KVWSwQkSmATfWDkyJw' }}
                          defaultCenter={center}
                          defaultZoom={13}
                          options={{
                            panControl: false,
                            mapTypeControl: false,
                            scrollwheel: false,
                            styles: settings?.env?.THEME == "dark" && mapDark
                          }}
                        >

                          <AnyReactComponent
                            lat={settings?.site.address_lat}
                            lng={settings?.site.address_lng}
                          >
                            <div style={{ marginTop: '-30px', marginLeft: '-15px' }}>
                              <RiMapPin2Fill size="45" className="text-primary" />
                            </div>
                          </AnyReactComponent>
                        </GoogleMapReact>
                      </div>)}

                    </div>
                    <div className="flex justify-between mt-2">
                      <p><small></small></p>
                      {settings?.order?.type?.takeaway == 'true' && settings?.order?.type?.delivery == 'true' && (
                        <div className="rounded px-4 mt-3 text-white  bg-primary py-2 text">
                          <span role="button" className="text-xs" onClick={onOpenOrderType}> ALTERAR ENTREGA / TAKEAWAY</span>
                        </div>
                      )}

                    </div>

                  </div>
                ))
              }


              <div className="shadow-700 bg-white dark:bg-black p-5 md:p-8" style={{ display: "none" }}>
                <Address
                  id={data?.me?.id!}
                  heading="Endereço para Envio"
                  addresses={data?.me?.address?.filter(
                    (address: any) => address.type === "shipping"
                  )}
                  count={3}
                  type="shipping"
                />
              </div>

             
              {settings?.scheduleType != "store" && (
                <div className="shadow-700 bg-white border dark:bg-neutral-800 dark:border-neutral-700 rounded-lg p-5 md:p-8">
                  <div className="absolute" id="target-schedule" style={{marginTop: '-96px'}}></div>
                  <div className="flex items-center justify-between mb-5 md:mb-8">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <span className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-base lg:text-xl text-white">2</span>
                      <p className="text-lg lg:text-xl text-heading dark:text-white">Data da {order_type != 'takeaway' ? 'Entrega' : 'Recolha'}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

                    { isDateValid() ? (
                      <div onClick={() => { optionChecked("now", "click") }} className={`px-4 py-3 text-center text-sm ${checkNow ? 'bg-primary display-inline text-white' : ''}  rounded h-12  border-gray-200 border dark:border-neutral-700 cursor-pointer`}>{order_type != 'takeaway' ? (
                        <><RiTruckFill style={{ display: "inline-block", verticalAlign: '-2px' }} /> Entregar</>)
                        : (
                          <><RiShoppingBag3Fill style={{ display: "inline-block", verticalAlign: '-2px' }} /> Levantar</>
                        )}  Agora</div>
                    ) : null}
                    <div onClick={() => { optionChecked("schedule", "click") }} className={`px-4 py-3 text-center text-sm  rounded  ${checkSchedule ? 'bg-primary h-12 text-white' : ''} border-gray-200 border dark:border-neutral-700 cursor-pointer`}>
                      <RiCalendar2Fill style={{ display: "inline-block", verticalAlign: '-2px' }} /> Agendar {order_type != 'takeaway' ? 'Entrega' : 'Recolha'}</div>

                    {
                      checkSchedule ?
                        (<div className="flex flex-nowrap w-full">
                          <div className="relative">
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-600 z-50 opacity-0" style={{width:'100%',height:'100%',zIndex:50}} onClick={() => datePickerRef.current.setFocus()}></div>
                            <DatePicker
                            locale="ptBR"
                            ref={datePickerRef}
                            selected={startDate}
                            minDate={start}
                            // placeholderText="Escolha a Data"
                            placeholderText="Data"
                            dateFormat="P"
                            onKeyDown={handleKeyDown}
                            filterDate={isWeekday}
                            onChange={handleOnChange}
                            className={"px-4 h-12 w-24 rounded outline-none dark:bg-black dark:text-white dark:border-neutral-700  appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 border border-gray-300 focus:border-primary".concat(startDate ? "" : "")}
                          />
                          </div>
                          
                          {weekName && !!includeTimes.length &&

                          <div className="relative">
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-600 z-50 opacity-0 " style={{width:'100%',height:'100%',zIndex:50}} onClick={() => hourPickerRef.current.setFocus()}></div>
                          
                          <DatePicker
                            locale="ptBR"
                            ref={hourPickerRef}
                            selected={times}
                            showTimeSelect
                            showTimeSelectOnly
                            //placeholderText="Escolha a Hora"
                            placeholderText="Hora"
                            includeTimes={includeTimes}
                            timeIntervals={15}
                            dateFormat="HH:mm"
                            filterDate={isWeekday}
                            onKeyDown={handleKeyDown}
                            onChange={handlerTime}
                            className="px-4 h-12 w-20  ml-4 rounded dark:bg-black dark:text-white dark:border-neutral-700  outline-none bg-gray-100  appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 border border-gray-300 focus:border-primary"
                          />
                          </div>
                          }
                        </div>) : null
                    }

                  </div>

                  <div style={{ display: "none" }} >
                    <Schedule count={2} />
                  </div>
                  { isDateValid() ? (
                    <>
                  {timeInterval > 0 && (<>
                    <div className="bg-yellow-100 mt-5 border-t-4 dark:text-neutral-800 border-yellow-300 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert" style={{ borderColor: '#FBBF24' }}>
                      <div className="flex">
                        <div className="py-1">
                          <RiTimeLine className="fill-current h-8 w-8 text-teal-500 mr-4" style={{ display: "inline-block", verticalAlign: '-2px' }} />
                        </div>
                        <div>
                          <p className="font-bold">{order_type == "delivery" ? "Esta Entrega tem tempo estimado de " : "Este Pedido tem um tempo estimado de preparação de "} {timeInterval}min</p>
                          <p className="text-sm">{order_type == "delivery" ? 
                          `O seu pedido atualmente tem uma estimativa de entrega de ${timeInterval} minutos. Prezamos sempre que o seu produto chegue com qualidade e em segurança.` 
                          : 
                          `O seu pedido atualmente tem uma estimativa de preparação de ${timeInterval} minutos. Terá de levantar o pedido no nossos balcões.`}</p>
                        </div>

                      </div>
                    </div>

                  </>)}
                  </>
                  ) : (<>
                      <div className="bg-yellow-100 dark:bg-yellow-400  dark:text-neutral-800 dark:border-yellow-600  mt-5 border-t-4 border-yellow-300 rounded-b text-teal-900  dark:text-black px-4 py-3 shadow-md" role="alert">
                        <div className="flex">
                          <div className="py-1">
                            <RiCalendar2Fill className="fill-current h-8 w-8 text-teal-500 mr-4" style={{ display: "inline-block", verticalAlign: '-2px' }} />
                          </div>
                          <div>
                            <p className="font-bold">A nossa Loja encontra-se fechada neste momento</p>
                            <p className="text-sm">Neste momento não poderá fazer encomendas para a entrega ou recolha instantânea mas poderá fazer um agendamento para uma data futura.</p>
                          </div>
                        </div>
                      </div>
                    </>)}
                </div>
              )}
              {/* <div className="shadow-700 bg-white dark:bg-black p-5 md:p-8"  >

 
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <div className="flex items-center space-x-3 md:space-x-4">
                <span className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-base lg:text-xl text-white">-</span>
                <p className="text-lg lg:text-xl text-heading ">Notas & Instruções</p>
              </div>
            </div>
            <TextArea
              label="Nota"
              {...register("obs")}
              variant="outline"
              onChange={saveObs}
              placeholder=""
              className="col-span-2"
            />

          </div> */  }
            </>

          )}
        </div>

        <div className="w-full lg:w-96 mb-10 sm:mb-12 lg:mb-0 mt-10">
          <VerifyCheckout />
        </div>
      </div>
    </div>
  );
}
CheckoutPage.Layout = Layout;
