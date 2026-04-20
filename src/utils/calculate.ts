export type Operation = '+' | '-' | '×' | '÷' | '%';

export function calculate(a: string, b: string, op: Operation): string {
  const prev = parseFloat(a);
  const current = parseFloat(b);

  if (isNaN(prev) || isNaN(current)) return '';

  let result: number;

  switch (op) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '×': result = prev * current; break;
    case '÷':
      if (current === 0) throw new Error('Division by zero');
      result = prev / current;
      break;
    case '%': result = prev % current; break;
    default: return '';
  }

  return String(Math.round(result * 100000000) / 100000000);
}
