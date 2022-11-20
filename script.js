window.onload = function() { 
    const form = document.forms.weather;
    
    async function loadWeather() {
        let url = "https://api.open-meteo.com/v1/forecast?";

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        url += "&timezone=" + timezone;

        const latitude = form.elements.latitude.value;
        url += "&latitude=" + latitude;

        const longitude = form.elements.longitude.value;
        url += "&longitude=" + longitude;

        url += "&current_weather=true";

        const response = await fetch(url);
        const body = await response.json();
        const { temperature } = body.current_weather;
        
        const tempElements = document.getElementsByClassName("temperature");
        for (let i = 0; i < tempElements.length; i++) {
            const currentElem = tempElements.item(i);
            currentElem.innerHTML = "Текущая температура: " + temperature + "°С";
        }
    }
    form.onsubmit = function() { 
        loadWeather();
        return false;
    };

};