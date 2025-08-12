const KEY = "vaultfut_email";

export function getEmail(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function setEmail(email: string) {
  localStorage.setItem(KEY, email.trim().toLowerCase());
}

export function clearEmail() {
  localStorage.removeItem(KEY);
}

export function isAuthed(): boolean {
  return !!getEmail();
}
