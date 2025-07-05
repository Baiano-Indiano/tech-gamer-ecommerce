import styled from 'styled-components';
import { FiTruck, FiShield, FiHeadphones, FiAward } from 'react-icons/fi';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: #2563eb;
    border-radius: 2px;
  }
`;

const SectionText = styled.p`
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #0369a1;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.div<{ bgImage: string }>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  margin: 0 auto 1.5rem;
  border: 4px solid #e2e8f0;
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #64748b;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  a {
    color: #64748b;
    transition: color 0.2s;
    
    &:hover {
      color: #2563eb;
    }
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle>Sobre a TechGamer</HeroTitle>
        <HeroSubtitle>
          A maior loja de produtos gamer e tecnologia do Brasil, oferecendo os melhores produtos com as melhores condições de pagamento.
        </HeroSubtitle>
      </HeroSection>
      
      <Section>
        <SectionTitle>Nossa História</SectionTitle>
        <SectionText>
          Fundada em 2015, a TechGamer nasceu da paixão por jogos e tecnologia. Começamos como uma pequena loja física e hoje somos referência nacional no comércio eletrônico de produtos gamer.
        </SectionText>
        <SectionText>
          Nossa missão é proporcionar a melhor experiência de compra, com produtos de qualidade, preços justos e um atendimento diferenciado. Acreditamos que a tecnologia tem o poder de transformar vidas e estamos aqui para levar o melhor do mundo gamer até você.
        </SectionText>
      </Section>
      
      <Section>
        <SectionTitle>Por que escolher a TechGamer?</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiTruck size={24} />
            </FeatureIcon>
            <FeatureTitle>Frete Grátis</FeatureTitle>
            <FeatureText>Entregamos em todo o Brasil com frete grátis para compras acima de R$ 299,00.</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiShield size={24} />
            </FeatureIcon>
            <FeatureTitle>Garantia Estendida</FeatureTitle>
            <FeatureText>Todos os nossos produtos possuem garantia e suporte técnico especializado.</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiHeadphones size={24} />
            </FeatureIcon>
            <FeatureTitle>Atendimento 24/7</FeatureTitle>
            <FeatureText>Nossa equipe de suporte está disponível 24 horas por dia, 7 dias por semana.</FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiAward size={24} />
            </FeatureIcon>
            <FeatureTitle>Melhores Marcas</FeatureTitle>
            <FeatureText>Trabalhamos apenas com as melhores e mais confiáveis marcas do mercado.</FeatureText>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
      
      <Section>
        <SectionTitle>Nossa Equipe</SectionTitle>
        <SectionText>
          Conheça o time por trás da TechGamer, apaixonados por tecnologia e comprometidos em oferecer a melhor experiência para você.
        </SectionText>
        
        <TeamGrid>
          <TeamMember>
            <MemberImage bgImage="https://randomuser.me/api/portraits/men/32.jpg" />
            <MemberName>Carlos Silva</MemberName>
            <MemberRole>CEO & Fundador</MemberRole>
            <SocialLinks>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </SocialLinks>
          </TeamMember>
          
          <TeamMember>
            <MemberImage bgImage="https://randomuser.me/api/portraits/women/44.jpg" />
            <MemberName>Ana Oliveira</MemberName>
            <MemberRole>Diretora de Vendas</MemberRole>
            <SocialLinks>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </SocialLinks>
          </TeamMember>
          
          <TeamMember>
            <MemberImage bgImage="https://randomuser.me/api/portraits/men/75.jpg" />
            <MemberName>Ricardo Santos</MemberName>
            <MemberRole>Gerente de TI</MemberRole>
            <SocialLinks>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </SocialLinks>
          </TeamMember>
          
          <TeamMember>
            <MemberImage bgImage="https://randomuser.me/api/portraits/women/68.jpg" />
            <MemberName>Juliana Costa</MemberName>
            <MemberRole>Chefe de Atendimento</MemberRole>
            <SocialLinks>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </SocialLinks>
          </TeamMember>
        </TeamGrid>
      </Section>
      
      <Section>
        <SectionTitle>Nossos Valores</SectionTitle>
        <SectionText>
          Na TechGamer, acreditamos em valores que vão além da venda de produtos. Buscamos construir relacionamentos duradouros com nossos clientes, baseados na confiança, transparência e excelência no atendimento.
        </SectionText>
        <SectionText>
          Estamos comprometidos em oferecer produtos de qualidade, preços justos e um atendimento diferenciado. Nosso objetivo é superar as expectativas dos nossos clientes em cada compra.
        </SectionText>
      </Section>
    </AboutContainer>
  );
};

export default About;
