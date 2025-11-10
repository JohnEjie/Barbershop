// Date formatting utilities
// Using built-in Date methods to avoid external dependencies

export function formatDate(date: string | Date, formatType: 'full' | 'short' | 'time' = 'full'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  if (formatType === 'time') {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
  
  if (formatType === 'short') {
    return `${monthsShort[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  
  // full format
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
