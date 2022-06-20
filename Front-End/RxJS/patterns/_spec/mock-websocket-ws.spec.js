
export class MockWebSocketWS {
  config = null;

  constructor(_config) {
    this.config = _config;
  }
  on = () => ({});
  send = () => ({});
}
