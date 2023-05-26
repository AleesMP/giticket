import Plunk from '@plunk/node'

const plunkKey = import.meta.env.VITE_PLUNK_KEY
const plunk = new Plunk(plunkKey)

const bodyTemplate = `
    <h1>¡Gracias por reservar su entrada en Giticket!</h1>
    <h2>Información sobre la reserva:</h2>
    <div><b>Película:</b> %movieTitle%</div>
    <div><b>Día y hora:</b> %bookingDate% - %bookingHour%</div>
    <button><a href="%bookingURL%" target="_blank">Ver reserva</a></button>
    <div><i>Recuerde presentar el código QR en taquilla</i></div>`

const getBody = (params) => {
    let bodyText = bodyTemplate
    Object.entries(params).forEach((paramPair) => bodyText = bodyText.replace(`%${paramPair[0]}%`, paramPair[1]))
    return bodyText
}

export { plunk, getBody }