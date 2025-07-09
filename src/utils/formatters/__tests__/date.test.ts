import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatDate, formatRelativeTime, getDaysDifference, isFutureDate } from '../date';

describe('Date Utils', () => {
  // Mock da data atual para testes consistentes
  const mockDate = new Date('2023-01-15T12:00:00Z');
  
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    it('deve formatar data no formato curto por padrão', () => {
      expect(formatDate('2023-01-01')).toBe('01/01/2023');
    });

    it('deve formatar data no formato médio', () => {
      expect(formatDate('2023-01-01', 'medium')).toBe('01 jan. 2023');
    });

    it('deve formatar data no formato longo', () => {
      expect(formatDate('2023-01-01', 'long')).toBe('01 janeiro 2023');
    });

    it('deve formatar data e hora', () => {
      expect(formatDate('2023-01-01T14:30:00', 'datetime')).toBe('01/01/2023 às 14:30');
    });

    it('deve retornar string vazia para data inválida', () => {
      expect(formatDate('data-invalida')).toBe('');
    });
  });

  describe('formatRelativeTime', () => {
    it('deve formatar data relativa corretamente', () => {
      const yesterday = new Date('2023-01-14T12:00:00Z');
      expect(formatRelativeTime(yesterday)).toMatch(/há 1 dia/);
    });
  });

  describe('getDaysDifference', () => {
    it('deve calcular a diferença em dias corretamente', () => {
      const startDate = '2023-01-10';
      expect(getDaysDifference(startDate)).toBe(5);
    });

    it('deve retornar null para datas inválidas', () => {
      expect(getDaysDifference('data-invalida')).toBeNull();
    });
  });

  describe('isFutureDate', () => {
    it('deve retornar true para datas futuras', () => {
      const futureDate = new Date('2023-02-01');
      expect(isFutureDate(futureDate)).toBe(true);
    });

    it('deve retornar false para datas passadas', () => {
      const pastDate = new Date('2022-12-31');
      expect(isFutureDate(pastDate)).toBe(false);
    });
  });
});
