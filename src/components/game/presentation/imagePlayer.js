import React from 'react'

const ImagePlayer = (props) => {
    return (
        <img
            id="gamer"
            src="/images/gif.gif"
            alt="Jugador"
            width="100"
            height="75"
            style={{
                position: 'absolute',
                zIndex: 10,
                top: props.possitionTop,
                left: props.possitionLeft
            }} />
    )
}

export default ImagePlayer