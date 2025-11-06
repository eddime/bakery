// 🥐 Bakery - Hot Reload Handler
// Handles reloading HTML content without closing the window

export class ReloadHandler {
  private static currentHTML: string | null = null;
  private static reloadCallback: (() => void) | null = null;

  static setHTML(html: string) {
    this.currentHTML = html;
  }

  static getHTML(): string | null {
    return this.currentHTML;
  }

  static onReload(callback: () => void) {
    this.reloadCallback = callback;
  }

  static triggerReload() {
    if (this.reloadCallback) {
      this.reloadCallback();
    }
  }
}

