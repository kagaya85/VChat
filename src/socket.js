import io from 'socket.io-client';

const isLocal = window.location.href.indexOf('debug') !== -1 || false

const config =  {
    server: (process.env.NODE_ENV === 'development' || isLocal )?  'http://127.0.0.1:2333/' : '//115.259.56.102:2333/',
}

const socket = io.connect(config.server);

export default socket;
