class WS {
  private ws: WebSocket | null;

  constructor() {
    this.ws = null;
  }

  connect(url: string) {
    if (!this.ws) {
      this.ws = new WebSocket(url);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  on(eventName: string, callback: (e: Event | MessageEvent) => void) {
    if (this.ws) {
      this.ws.addEventListener(eventName, callback);
    }
  }
}

export default WS;
