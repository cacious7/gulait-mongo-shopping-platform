    /**
     * Returns the current hostname
     */
    const getHostUrl = () => {
        const protocol = window.location.protocol;
        const slashes = window.location.protocol.concat( '//' );
        const port = window.location.port.length > 1 ? `:${ window.location.port }` : '';
        const host = slashes.concat( window.location.hostname ).concat( port );
        return host ;
    }

    module.exports = getHostUrl;