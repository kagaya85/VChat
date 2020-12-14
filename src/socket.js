import io from 'socket.io-client';

const isLocal = window.location.href.indexOf('debug') !== -1 || false

const config =  {
    server: (process.env.NODE_ENV === 'development' || isLocal )?  'http://localhost:2333/' : '//localhost:2333/',
}

const socket = io.connect(config.server);

export default socket;
