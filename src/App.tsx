import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Delete } from 'lucide-react';
import { Button } from './components/Button';
import { calculate, type Operation } from './utils/calculate';

// Only keys the calculator handles — prevents blocking Ctrl+R, F5, tab, etc.
const HANDLED_KEYS = new Set([
  '0','1','2','3','4','5','6','7','8','9',
  '.', '=', 'Enter', 'Backspace', 'Escape',
  '+', '-', '*', '/', '%',
]);

export default function App() {
  // Persist theme: respect OS preference on first load, remember user choice after
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('calc-dark-mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  // error is now a separate concern — currentValue stays numeric/clean
  const [error, setError] = useState<string | null>(null);

  // Sync dark mode class and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('calc-dark-mode', String(darkMode));
  }, [darkMode]);

  const clear = useCallback(() => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(false);
    setError(null);
  }, []);

  const deleteChar = useCallback(() => {
    if (error) { clear(); return; }
    if (overwrite) { clear(); return; }
    if (
      currentValue.length === 1 ||
      (currentValue.length === 2 && currentValue.startsWith('-'))
    ) {
      setCurrentValue('0');
    } else {
      setCurrentValue((v) => v.slice(0, -1));
    }
  }, [currentValue, overwrite, error, clear]);

  const appendNumber = useCallback(
    (num: string) => {
      if (error) clear();
      if (overwrite) {
        setCurrentValue(num === '.' ? '0.' : num);
        setOverwrite(false);
        return;
      }
      if (num === '.' && currentValue.includes('.')) return;
      if (currentValue === '0' && num !== '.') {
        setCurrentValue(num);
      } else {
        setCurrentValue((v) => v + num);
      }
    },
    [currentValue, overwrite, error, clear],
  );

  const chooseOperation = useCallback(
    (op: Operation) => {
      if (error) clear();

      // Allow typing a negative number from scratch
      if (op === '-' && currentValue === '0' && previousValue === null) {
        setCurrentValue('-');
        return;
      }

      if (currentValue === '-') return;

      if (previousValue === null) {
        setPreviousValue(currentValue);
        setOperation(op);
        setOverwrite(true);
        return;
      }

      if (operation) {
        try {
          const result = calculate(previousValue, currentValue, operation);
          setPreviousValue(result);
          setCurrentValue(result);
          setOperation(op);
          setOverwrite(true);
        } catch {
          setError('Erro: ÷ 0');
          setPreviousValue(null);
          setOperation(null);
          setOverwrite(false);
        }
      }
    },
    [currentValue, previousValue, operation, error, clear],
  );

  const calculateResult = useCallback(() => {
    if (operation === null || previousValue === null) return;

    try {
      const result = calculate(previousValue, currentValue, operation);
      setCurrentValue(result);
      setError(null);
    } catch {
      setError('Erro: ÷ 0');
    } finally {
      setPreviousValue(null);
      setOperation(null);
      setOverwrite(true);
    }
  }, [currentValue, previousValue, operation]);

  // Keyboard support — only preventDefault for keys the calculator uses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!HANDLED_KEYS.has(e.key)) return;
      e.preventDefault();

      if (/[0-9]/.test(e.key))   appendNumber(e.key);
      else if (e.key === '.')       appendNumber('.');
      else if (e.key === '=' || e.key === 'Enter') calculateResult();
      else if (e.key === 'Backspace') deleteChar();
      else if (e.key === 'Escape')  clear();
      else if (e.key === '+')       chooseOperation('+');
      else if (e.key === '-')       chooseOperation('-');
      else if (e.key === '*')       chooseOperation('×');
      else if (e.key === '/')       chooseOperation('÷');
      else if (e.key === '%')       chooseOperation('%');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendNumber, calculateResult, deleteChar, clear, chooseOperation]);

  const displayValue = error ?? currentValue;
  const isError = error !== null;

  return (
    <div className="min-h-screen transition-colors duration-500 flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 font-sans relative z-0 overflow-hidden">
      {/* Abstract mesh background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #f43f5e 0%, transparent 40%), radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)',
          filter: 'blur(80px)',
          opacity: darkMode ? 0.3 : 0.15,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-[40px] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] bg-white/40 dark:bg-black/40 backdrop-blur-[24px] border border-white/40 dark:border-white/10 flex flex-col gap-5 relative z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold tracking-widest text-slate-800/40 dark:text-white/50 uppercase select-none">
            Calc
          </span>
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label={darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="p-2 rounded-full cursor-pointer bg-white/40 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/20 transition backdrop-blur-md"
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Display */}
        <div
          role="region"
          aria-label="Display da calculadora"
          className="flex flex-col items-end px-2 pt-6 pb-2 h-32 justify-end"
        >
          <div className="text-slate-600/50 dark:text-white/40 text-lg min-h-[28px] overflow-hidden select-none">
            {previousValue} {operation}
          </div>
          <motion.div
            key={displayValue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            aria-live="polite"
            aria-atomic="true"
            className={`text-right font-light tracking-tight overflow-hidden break-all leading-tight ${
              displayValue.length > 10 ? 'text-3xl' : 'text-5xl lg:text-6xl'
            } ${isError ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}
          >
            {displayValue}
          </motion.div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3 h-96">
          <Button onClick={clear} variant="secondary">AC</Button>
          <Button onClick={deleteChar} variant="secondary" aria-label="Apagar">
            <Delete size={24} />
          </Button>
          <Button onClick={() => chooseOperation('%')} variant="secondary">%</Button>
          <Button onClick={() => chooseOperation('÷')} variant="accent">÷</Button>

          <Button onClick={() => appendNumber('7')}>7</Button>
          <Button onClick={() => appendNumber('8')}>8</Button>
          <Button onClick={() => appendNumber('9')}>9</Button>
          <Button onClick={() => chooseOperation('×')} variant="accent">×</Button>

          <Button onClick={() => appendNumber('4')}>4</Button>
          <Button onClick={() => appendNumber('5')}>5</Button>
          <Button onClick={() => appendNumber('6')}>6</Button>
          <Button onClick={() => chooseOperation('-')} variant="accent">-</Button>

          <Button onClick={() => appendNumber('1')}>1</Button>
          <Button onClick={() => appendNumber('2')}>2</Button>
          <Button onClick={() => appendNumber('3')}>3</Button>
          <Button onClick={() => chooseOperation('+')} variant="accent">+</Button>

          <Button onClick={() => appendNumber('0')} className="col-span-2 w-full h-full">0</Button>
          <Button onClick={() => appendNumber('.')}>.</Button>
          <Button onClick={calculateResult} variant="accent">=</Button>
        </div>
      </motion.div>
    </div>
  );
}
