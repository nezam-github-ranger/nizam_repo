import { LightningElement } from 'lwc';
import fetchWeatherVolume from '@salesforce/apex/WeatherVolume.fetchWeatherVolume';
export default class WeatherVolume extends LightningElement {
    inputCity;
    isRecordAvailable;
    isFirstTime = true;

    humidity;
    pressure;
    temperature;
    temp_max;
    temp_min;
    feels_like;
    grnd_level;
    sea_level;

    
    handleSearch() {
        fetchWeatherVolume({city: this.inputCity})   
        .then((result) => {
            console.log('result ==> ', result);
            this.humidity = result.humidity;
            this.pressure = result.pressure;
            this.temperature = result.temp;
            this.temp_max = result.temp_max;
            this.temp_min = result.temp_min;
            this.feels_like = result.feels_like;
            this.grnd_level = result.grnd_level;
            this.sea_level = result.sea_level;

            if(result.temp == null){
                if(this.inputCity){
                    this.isRecordAvailable = true;
                    this.isFirstTime = false;
                }else{
                    this.isFirstTime = true;
                    this.isRecordAvailable = false;
                }
            }else{
                this.isRecordAvailable = false;
                this.isFirstTime = false;
            }
        })  
        .catch((error) => {
            console.log(error);
        })
    }

    getInput(event){
        this.inputCity = event.target.value;
        console.log('input city ==> ', this.inputCity);
    }

}