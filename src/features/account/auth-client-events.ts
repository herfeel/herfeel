export const accountAuthChangedEvent = "playah:account-auth-changed";

export function notifyAccountAuthChanged() {
  window.dispatchEvent(new Event(accountAuthChangedEvent));
}
