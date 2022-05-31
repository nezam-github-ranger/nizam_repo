public with sharing class WeatherVolume {
    
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> fetchWeatherVolume(String city){
        String apiKey = '7fa3d40797d21ffd26c555069151cfc0';
        String requestEndPoint = 'http://api.openweathermap.org/data/2.5/weather';
        requestEndPoint += '?q=' + city + '&units=metric' + '&APPID=' + apiKey;
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(requestEndPoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        Map<String, Object> resultMap =  response.getStatusCode() == 200 ? (Map<String, Object>)((Map<String, Object>)JSON.deserializeUntyped(response.getBody())).get('main') : new Map<String, String>();
        System.debug('resultMap ==> ' + resultMap);
        return resultMap;
    }
}