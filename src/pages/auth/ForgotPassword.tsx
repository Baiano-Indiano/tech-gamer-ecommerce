import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ForgotPasswordContainer = styled.div`
  max-width: 480px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: #475569;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #475569;
  
  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending recovery email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <Title>Reset Your Password</Title>
      
      {isSubmitted ? (
        <>
          <SuccessMessage>
            An email with password reset instructions has been sent to <strong>{email}</strong>.
          </SuccessMessage>
          <BackToLogin>
            <Link to="/login">Back to login</Link>
          </BackToLogin>
        </>
      ) : (
        <>
          <p style={{ color: '#475569', marginBottom: '1.5rem', textAlign: 'center' }}>
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </FormGroup>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
            
            <BackToLogin>
              Remember your password? <Link to="/login">Sign in</Link>
            </BackToLogin>
          </Form>
        </>
      )}
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
