import React, { useState } from 'react';

const EmbededGoogleMap = ( props ) => {
    const [ apiKey, setApiKey ] = useState( 'AIzaSyBmuIBESvw97GwrpZyqy8AHXhfxWh8z2os' );
    // const [ url, setUrl ] = useState( `https://www.google.com/maps/embed/v1/place?key=${ apiKey } &q=Space+Needle,Seattle+WA`  );
    const [ url, setUrl ] = useState( 
        `https://www.google.com/maps/embed/v1/place?key=${ apiKey } &q=${ props.location.latitude },${ props.location.longitude }`
    );

    console.log( 'Generated coords = ', props.location );

    return (
        <iframe
            width={ props.width ? props.width : '100%' }
            height={ props.height ? props.height : '100%' }
            frameBorder={ props.frameBorder ? props.frameBorder :  '0' } 
            style={ props.style ? props.style : { border: 0 } }
            className={ props.className ? props.className : '' }
            src={ url }
            allowFullScreen
        >
        </iframe>
    );
}

export default EmbededGoogleMap;