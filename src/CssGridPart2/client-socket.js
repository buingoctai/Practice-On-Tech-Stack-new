import io from 'socket.io-client';

class RunBuild {
  constructor(source) {
   // this.socket = io('http://neca-middleman.zalo-pc.zte-dev.zalo.services', {
    this.socket = io('http://neca-middleman.zalo-pc.zte-dev.zalo.services/xxx', {

      transports: ['websocket', 'polling', 'flashsocket'],
      query: { source },
      reconnection: true,
    });
    this.socket.on('connect', () => {
      console.log('CONNECT_ESTABLISHED');
    });
    this.buildEvents = null;
    this.source = source;
    
  }
  doBuild({ params, buildEvents }) {
    this.buildEvents = buildEvents;
    // this.socket = io('https://socket-build-new-testing.herokuapp.com', {
    //   transports: ['websocket', 'polling', 'flashsocket'],
    //   query: { source: this.source },
    //   reconnection: false,
    // });
    // this.socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'], query: { source: this.source } });

    // this.socket.on('connect', () => {
    //   console.log('CONNECT_ESTABLISHED');
    //   this.socket.emit('BUILD', params);
    // });

    this.socket.emit('BUILD', params);
    this.socket.on('OUTPUT BUILD', (output) => {
      console.log(output);
      const { action, ...restRes } = output;
      // Includes: action, message, code
      switch (action) {
        case 'BUILD':
          this.buildEvents.handleBuildResult(restRes);
          this.socket.off(); 
          break;
        case 'STATE':
          this.buildEvents.handleBuildState(restRes);
          break;
        case 'CANCEL':
          this.buildEvents.handleCanceledBuild(restRes);
          this.socket.off(); 
          break;
        case 'ERROR':
          this.buildEvents.handleError(restRes);
          this.socket.off(); 
          break;
        default:
          this.socket.off(); 
          console.log(restRes.message);
      }
    });
  }

  getBuildState(params) {
    if (!this.socket) return 'ERROR_INVALID_SOCKET';
    console.log('getBuildState');
    this.socket.emit('BUILD', params);
  }

  cancelBuild(params) {
    if (!this.socket) return 'ERROR_INVALID_SOCKET';
    console.log('cancelBuild');
    this.socket.emit('BUILD', params);
  }
}

export default RunBuild;
