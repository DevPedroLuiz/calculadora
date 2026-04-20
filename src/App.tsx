// Calculadora Animada - Copyright (C) 2025 <Seu Nome>
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License.

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Delete } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState(false);

  // Tema Escuro/Claro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const clear = useCallback(() => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(false);
    setError(false);
  }, []);

  const deleteChar = useCallback(() => {
    if (error) {
      clear();
      return;
    }
    if (overwrite) {
      clear();
      return;
    }
    if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
      setCurrentValue('0');
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  }, [currentValue, overwrite, error, clear]);

  const appendNumber = useCallback((num: string) => {
    if (error) clear();
    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
      return;
    }
    if (num === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && num !== '.') {
      setCurrentValue(num);
    } else {
      setCurrentValue(currentValue + num);
    }
  }, [currentValue, overwrite, error, clear]);

  const calculate = (a: string, b: string, op: string) => {
    const prev = parseFloat(a);
    const current = parseFloat(b);
    if (isNaN(prev) || isNaN(current)) return '';
    let computation = 0;
    switch (op) {
      case '+': computation = prev + current; break;
      case '-': computation = prev - current; break;
      case '×': computation = prev * current; break;
      case '÷':
        if (current === 0) return 'Erro';
        computation = prev / current;
        break;
      case '%': computation = prev % current; break;
    }
    return String(Math.round(computation * 100000000) / 100000000);
  };

  const chooseOperation = useCallback((op: string) => {
    if (error) clear();
    if (currentValue === '0' && previousValue === null) {
      // Se não tem nada e é menos, pode ser para deixar o número negativo
      if (op === '-') {
          setCurrentValue('-');
          return;
      }
    }
    if (currentValue === '-' || currentValue === 'Erro') return;
      
    if (previousValue == null) {
      setPreviousValue(currentValue);
      setOperation(op);
      setOverwrite(true);
      return;
    }
    if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      if (result === 'Erro') {
        setError(true);
        setCurrentValue('Erro');
      } else {
        setPreviousValue(result);
        setCurrentValue(result);
      }
      setOperation(op);
      setOverwrite(true);
    }
  }, [currentValue, previousValue, operation, error, clear]);

  const calculateResult = useCallback(() => {
    if (operation == null || previousValue == null) return;
    const result = calculate(previousValue, currentValue, operation);
    
    if (result === 'Erro') {
        setError(true);
    }
    
    setCurrentValue(result);
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  }, [currentValue, previousValue, operation]);

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault(); // Prevents default browser behaviors like scrolling with Spacebar
      if (/[0-9]/.test(e.key)) appendNumber(e.key);
      if (e.key === '.') appendNumber('.');
      if (e.key === '=' || e.key === 'Enter') calculateResult();
      if (e.key === 'Backspace') deleteChar();
      if (e.key === 'Escape') clear();
      if (e.key === '+') chooseOperation('+');
      if (e.key === '-') chooseOperation('-');
      if (e.key === '*') chooseOperation('×');
      if (e.key === '/') chooseOperation('÷');
      if (e.key === '%') chooseOperation('%');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendNumber, calculateResult, deleteChar, clear, chooseOperation]);

  // Componente de botão encapsulado
  const Button = ({ children, onClick, className = '', variant = 'default' }: any) => {
    const baseStyle = "flex items-center justify-center text-xl font-medium rounded-[18px] transition-colors outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-orange-500/50 shadow-sm backdrop-blur-sm";
    
    const variants = {
      default: "bg-white/40 hover:bg-white/50 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white border border-white/20 dark:border-transparent",
      accent: "bg-orange-500/80 hover:bg-orange-500 text-white",
      secondary: "bg-white/60 hover:bg-white/70 text-slate-800 dark:bg-white/20 dark:hover:bg-white/30 dark:text-slate-400 border border-white/20 dark:border-transparent",
    };

    return (
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.02 }}
        className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 font-sans relative z-0 overflow-hidden`}>
      {/* Abstract Mesh Background */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #f43f5e 0%, transparent 40%), radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%)',
          filter: 'blur(80px)',
          opacity: darkMode ? 0.3 : 0.15,
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm rounded-[40px] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] bg-white/40 dark:bg-black/40 backdrop-blur-[24px] border border-white/40 dark:border-white/10 flex flex-col gap-5 relative z-10"
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center px-1">
          <div className="text-xs font-bold tracking-widest text-slate-800/40 dark:text-white/50 uppercase">
            Calc
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
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
        <div className="flex flex-col items-end px-2 pt-6 pb-2 h-32 justify-end">
          <div className="text-slate-600/50 dark:text-white/40 text-lg min-h-[28px] overflow-hidden">
            {previousValue} {operation}
          </div>
          <motion.div 
            key={currentValue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-right font-light tracking-tight overflow-hidden break-all leading-tight ${
              currentValue.length > 10 ? 'text-4xl' : 'text-5xl lg:text-6xl'
            } ${error ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}
          >
            {currentValue}
          </motion.div>
        </div>

        {/* Teclado */}
        <div className="grid grid-cols-4 gap-3 h-96">
          <Button onClick={clear} variant="secondary" className="text-slate-800 dark:text-slate-400">AC</Button>
          <Button onClick={deleteChar} variant="secondary">
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
