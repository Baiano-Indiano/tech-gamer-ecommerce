import { 
  format, 
  parseISO, 
  isValid, 
  formatDistanceToNow, 
  isDate
} from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

type DateInput = Date | string | number;
type DateFormat = 'short' | 'medium' | 'long' | 'full' | 'custom';

const DATE_FORMATS = {
  short: 'dd/MM/yyyy',
  medium: 'dd MMM yyyy',
  long: 'dd MMMM yyyy',
  full: 'EEEE, d \'de\' MMMM \'de\' yyyy',
  datetime: "dd/MM/yyyy 'às' HH:mm",
  time: 'HH:mm',
  monthYear: 'MMMM/yyyy'
} as const;

/**
 * Converte uma entrada para objeto Date
 * @param input Data de entrada (string, Date ou timestamp)
 * @returns Objeto Date ou null se inválido
 */
const parseDate = (input: DateInput): Date | null => {
  try {
    if (isDate(input)) return input;
    if (typeof input === 'string') return parseISO(input);
    if (typeof input === 'number') return new Date(input);
    
    console.warn('Tipo de data não suportado:', { input, type: typeof input });
    return null;
  } catch (error) {
    console.error('Erro ao fazer parse da data:', { input, error });
    return null;
  }
};

/**
 * Formata uma data de acordo com o formato especificado
 * @param date Data a ser formatada
 * @param formatType Formato desejado (short, medium, long, full) ou string de formato personalizado
 * @returns Data formatada ou string vazia se inválida
 * 
 * @example
 * // Retorna "01/01/2023"
 * formatDate('2023-01-01');
 * 
 * @example
 * // Retorna "01 de janeiro de 2023"
 * formatDate('2023-01-01', 'long');
 * 
 * @example
 * // Retorna "01/01/2023 às 14:30"
 * formatDate('2023-01-01T14:30:00', 'datetime');
 */
export const formatDate = (
  date: DateInput, 
  formatType: DateFormat | string = 'short'
): string => {
  const dateObj = parseDate(date);
  if (!dateObj || !isValid(dateObj)) {
    console.warn('Data inválida fornecida para formatação:', date);
    return '';
  }

  const formatString = DATE_FORMATS[formatType as keyof typeof DATE_FORMATS] || formatType;
  
  try {
    return format(dateObj, formatString, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', { date, formatType, error });
    return '';
  }
};

/**
 * Formata uma data para um formato relativo (ex: "há 2 dias")
 * @param date Data de referência
 * @returns String com o tempo relativo
 */
export const formatRelativeTime = (date: DateInput): string => {
  const dateObj = parseDate(date);
  if (!dateObj || !isValid(dateObj)) return '';
  
  try {
    return formatDistanceToNow(dateObj, { 
      addSuffix: true, 
      locale: ptBR 
    });
  } catch (error) {
    console.error('Erro ao formatar tempo relativo:', { date, error });
    return '';
  }
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param startDate Data inicial
 * @param endDate Data final (padrão: data atual)
 * @returns Número de dias de diferença ou null se inválido
 */
export const getDaysDifference = (
  startDate: DateInput, 
  endDate: DateInput = new Date()
): number | null => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  
  if (!start || !end) return null;
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Verifica se uma data é futura em relação à data de referência
 * @param date Data a ser verificada
 * @param reference Data de referência (padrão: data atual)
 * @returns Booleano indicando se é uma data futura
 */
export const isFutureDate = (
  date: DateInput, 
  reference: DateInput = new Date()
): boolean => {
  const dateObj = parseDate(date);
  const referenceObj = parseDate(reference);
  
  return !!dateObj && !!referenceObj && dateObj > referenceObj;
};

/**
 * Formata uma data para o formato relativo (ex: "há 2 dias")
 * @param date Data a ser formatada
 * @returns Data formatada como texto relativo
 */
export const formatDateRelative = (date: Date | string | number): string => {
  try {
    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = parseISO(date);
    } else if (typeof date === 'number') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }

    if (!isValid(dateObj)) {
      console.warn('Data inválida fornecida para formatação relativa:', date);
      return '';
    }

    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: ptBR,
    });
  } catch (error) {
    console.error('Erro ao formatar data relativa:', error);
    return '';
  }
};
