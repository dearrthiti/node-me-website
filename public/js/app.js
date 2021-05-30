console.log('Client side javscript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageForecast = document.querySelector('#forecast')
const messageLocation = document.querySelector('#location')

messageForecast.textContent = ''
messageLocation.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`/weathers?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageForecast.textContent = data.error
            } else {
                messageForecast.textContent = data.forecast
                messageLocation.textContent = data.location
            }
        })
    })
})