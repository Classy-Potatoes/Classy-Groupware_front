import {useEffect, useState} from "react";

function TodayWeather() {


    const API_KEY = process.env.REACT_APP_WEATHER_KEY;

    const [position, setPosition] =useState({});
    const [cityname, setCityName] = useState('');
    const [weather, setWeather] = useState({});
    const [main, setMain ]= useState({});
    const [icon, setIcon] = useState('');

    useEffect(() => {

        new Promise(resolve => {
            /* 위도 경도 알아오기 */
            navigator.geolocation.getCurrentPosition(
                currentPosition => {
                    console.log(currentPosition);
                    setPosition({
                        latitude : currentPosition.coords.latitude,
                        longitude : currentPosition.coords.longitude
                    })
                    resolve(currentPosition.coords);
                }
            );
        })
            .then(coords =>
                /* 날씨 api 가져오기 */
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&lang=kr`)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        setCityName(json.name);
                        setWeather(json.weather[0]);
                        setMain(json.main);
                        setIcon(json.weather[0].icon); // 날씨 아이콘 설정
                    })
            );

    },[]);

    /* 현재 날짜 */
    const today = new Date();
    // 현재 날짜를 가져옵니다.
    const formattedYear = today.getFullYear().toString().slice(-2);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const formattedFull = `${formattedYear}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${daysOfWeek[today.getDay()]}요일`;

    return(
        <>
            <div className="today-weather-div">오늘의 날씨</div>
            <div className="today">{formattedFull}</div>
            <div className="weather-cityname">{cityname}</div>
            <div className="today-weather">
                <div>
                    <img src={`http://openweathermap.com/img/w/${icon}.png`} alt="Weather Icon" />
                </div>
                <div className="weather-temp-div">
                    <div
                        className="weather-temp"
                    >{(main.temp - 273.15).toFixed(0)}°C</div>
                    <div
                        className="weather-description"
                    >{weather.description}</div>
                </div>
            </div>
        </>
    );
}

export default TodayWeather;