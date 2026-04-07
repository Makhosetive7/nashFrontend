import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const Hero = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 48px;
  opacity: 0.95;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: 18px 48px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 16px;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: white;
  padding: 18px 48px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  border: 2px solid white;
  transition: all 0.3s;

  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 16px;
  }
`;

const Features = styled.section`
  padding: 100px 20px;
  background: white;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 64px;
  color: ${props => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 40px 20px;
  border-radius: 16px;
  background: ${props => props.theme.colors.background};
  transition: all 0.3s;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.accent};
  }
`;

const FeatureIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.primary};
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const Stats = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div``;

const StatNumber = styled.div`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const StatLabel = styled.div`
  font-size: 18px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.p`
  opacity: 0.6;
  font-size: 14px;
`;

function Home() {
  return (
    <HomeContainer>
      <Navbar />

      <Hero>
        <HeroContent>
          <HeroTitle>
            Manage Your Mobile Shop
            <br />
            With Confidence
          </HeroTitle>
          <HeroSubtitle>
            Complete inventory and sales management system designed for mobile phone retailers. 
            Track products, record sales, and grow your business effortlessly.
          </HeroSubtitle>
          <CTAButtons>
            <PrimaryButton to="/dashboard">Get Started Free →</PrimaryButton>
            <SecondaryButton to="/products">View Demo</SecondaryButton>
          </CTAButtons>
        </HeroContent>
      </Hero>

      <Features>
        <FeaturesContainer>
          <SectionTitle>Everything You Need to Succeed</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>📦</FeatureIcon>
              <FeatureTitle>Product Management</FeatureTitle>
              <FeatureDescription>
                Add, edit, and organize your mobile phone inventory with ease. 
                Track stock levels and never run out of popular models.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>Sales Tracking</FeatureTitle>
              <FeatureDescription>
                Record sales instantly with automatic stock updates. 
                Keep perfect records of every transaction.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Analytics Dashboard</FeatureTitle>
              <FeatureDescription>
                Real-time insights into your business performance. 
                See top products, revenue trends, and low stock alerts.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Fast & Reliable</FeatureTitle>
              <FeatureDescription>
                Built with modern technology for speed and reliability. 
                Access your data anytime, anywhere.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Secure Storage</FeatureTitle>
              <FeatureDescription>
                Your data is protected with industry-standard security. 
                MySQL database with proper safeguards.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>Mobile Friendly</FeatureTitle>
              <FeatureDescription>
                Fully responsive design works on all devices. 
                Manage your shop from your phone or desktop.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesContainer>
      </Features>

      <Stats>
        <SectionTitle style={{ color: 'white', marginBottom: '48px' }}>
          Trusted by Mobile Retailers
        </SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatNumber>99%</StatNumber>
            <StatLabel>Uptime</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>Fast</StatNumber>
            <StatLabel>Performance</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Access</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>Secure</StatNumber>
            <StatLabel>Data Protection</StatLabel>
          </StatCard>
        </StatsGrid>
      </Stats>

      <Footer>
        <FooterContent>
          <FooterLinks>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href="#support">Support</FooterLink>
          </FooterLinks>
          <Copyright>
            © 2026 NashMart. Built with React & PHP. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </HomeContainer>
  );
}

export default Home;