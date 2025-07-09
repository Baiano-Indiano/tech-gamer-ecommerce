import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface FeedbackProps {
  type: FeedbackType;
  message: string;
  onClose?: () => void;
  show?: boolean;
  autoClose?: number;
}

const FeedbackContainer = styled(motion.div)<{ type: FeedbackType }>`
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return `
          background-color: #f0fdf4;
          color: #166534;
          border-left: 4px solid #16a34a;
        `;
      case 'error':
        return `
          background-color: #fef2f2;
          color: #991b1b;
          border-left: 4px solid #dc2626;
        `;
      case 'warning':
        return `
          background-color: #fffbeb;
          color: #92400e;
          border-left: 4px solid #f59e0b;
        `;
      default: // info
        return `
          background-color: #eff6ff;
          color: #1e40af;
          border-left: 4px solid ${theme.colors.primary};
        `;
    }
  }}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Message = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.5;
`;

export const Feedback = ({
  type = 'info',
  message,
  onClose,
  show = true,
  autoClose = 5000
}: FeedbackProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiAlertCircle />;
      case 'warning':
        return <FiAlertCircle />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <FeedbackContainer
          type={type}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            if (autoClose && onClose) {
              setTimeout(() => {
                onClose();
              }, autoClose);
            }
          }}
        >
          <IconWrapper>{getIcon()}</IconWrapper>
          <Message>{message}</Message>
          {onClose && (
            <CloseButton onClick={onClose} aria-label="Fechar">
              <FiX />
            </CloseButton>
          )}
        </FeedbackContainer>
      )}
    </AnimatePresence>
  );
};

