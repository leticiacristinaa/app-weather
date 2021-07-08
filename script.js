function getCity(){
    let city = document.getElementById('input').value

    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=65721cbbeef8ca2bec9792bbba63f21b&lang=pt_br'

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.open('GET', url)

    xmlHttp.onreadystatechange = () =>{
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            
            let textJSON = xmlHttp.responseText
            let objJSON = JSON.parse(textJSON)

            //console.log(objJSON)
            let container = document.getElementById('container')
            container.className = 'content'
            document.getElementById('city').innerText = `${objJSON.name}, ${objJSON.sys.country} `
        
            document.getElementById('date')
            let dateNow = new Date()
            date.innerHTML = currentDate(dateNow)

            let temperature = `${objJSON.main.temp}`
            c = temperature - 273

            document.getElementById('temp').innerHTML = `${Math.round(c)}°C`

            let img = document.getElementById('icon')
            let imgName = objJSON.weather[0].icon
            img.innerHTML = `<img src="./icons/${imgName}.png">`

            document.getElementById('description').innerHTML = `${objJSON.weather[0].description}`

            document.getElementById('temp-high-low').innerHTML = `${Math.round(objJSON.main.temp_max - 273)}°C / ${Math.round(objJSON.main.temp_min - 273)}°C`
        }
        
        else if(xmlHttp.status == 404){
            container.classList.remove('content');
            document.getElementById('city').innerHTML = ''
            document.getElementById('date').innerHTML = ''
            document.getElementById('temp').innerHTML = ''
            document.getElementById('icon').innerHTML = ''
            document.getElementById('description').innerHTML = ''
            document.getElementById('temp-high-low').innerHTML = ''
            let errorMsg = document.getElementById('container-error')
            errorMsg.className = 'content-error'
            errorMsg.innerHTML = 'Cidade não encontrada, por favor digite corretamente e tente novamente'
        }
    }
    xmlHttp.send()
    document.getElementById('input').value = ''
    document.getElementById('container-error').innerHTML = ''
}

function currentDate(d){
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date} de ${month} ${year}`
}
