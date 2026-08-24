export class GeminiLiveClient {
  private ws: WebSocket | null = null;

  connect(token: string) {
    // Connects to the secure backend route rather than exposing the API key directly
    this.ws = new WebSocket(`wss://generativelanguage.googleapis.com/ws/google.cloud.aiplatform.v1beta1.LlmRealtimeService/Chat?access_token=${token}`);
    
    this.ws.onopen = () => console.log('AI Neural Link Established.');
    
    this.ws.onmessage = (event) => {
      // Handle incoming voice and data from the AI
      console.log('AI Response:', event.data);
    };

    this.ws.onerror = (error) => console.error('AI Connection Error:', error);
  }

  sendFrame(base64Image: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ image: base64Image }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
