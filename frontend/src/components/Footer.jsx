import styled from 'styled-components'

// Footer container
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10vh 10vw;
  background-color: #022031;
  color: white;
  gap: 5vh;
`

// Social media section
const SocialMediaSection = styled.div`
  display: flex;
  gap: 15px;
`

// Social media link
const SocialMediaLink = styled.a`
  color: #008dda;
  font-size: 1.5rem;
  text-decoration: none;

  &:hover {
    color: #036ca5;
  }
`

// Info section
const InfoSection = styled.div`
  display: flex;
  gap: 70px;
`

// Info div
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40vw;
`

// Links
const FooterLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
const ContactsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

// Contact item
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const LinksDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Footer = () => {
  return (
    <FooterContainer>
      <InfoSection>
        <InfoDiv>
          <h3 className='font-large'>Auto-Doc</h3>
          <p>
            Our platform is a groundbreaking initiative that enhances digital
            empowerment by providing secure access to authentic documents
            through a state-of-the-art digital interface. Leveraging AI and
            blockchain technology, it offers a reliable cloud-based solution for
            the generation, storage, verification, and retrieval of essential
            documents.
          </p>
        </InfoDiv>
        <LinksDiv>
          <FooterLink href='/'>Home</FooterLink>
          <FooterLink href='/about'>About</FooterLink>
          <FooterLink href='/contact'>Contact</FooterLink>
          <FooterLink href='/verification'>Verification</FooterLink>
          <FooterLink href='/services'>Services</FooterLink>
          <FooterLink href='/faqs'>FAQs</FooterLink>
        </LinksDiv>
        <ContactsDiv>
          <h3>Contact Us</h3>
          <ContactItem>
            <span className='material-symbols-outlined'>mail</span>
            <span>solveeaseofficial@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <span className='material-symbols-outlined'>call</span>
            <span>+91 7275156652</span>
          </ContactItem>
          <ContactItem>
            <span className='material-symbols-outlined'>location_on</span>
            <span>Keshav Mahavidyalaya (UOD), New-Delhi, 110034</span>
          </ContactItem>
        </ContactsDiv>
      </InfoSection>
      <SocialMediaSection>
      <SocialMediaLink
          href='https://github.com/solve-ease'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fa-brands fa-github'></i>
        </SocialMediaLink>
        <SocialMediaLink
          href='https://www.instagram.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fa-brands fa-instagram'></i>
        </SocialMediaLink>
        <SocialMediaLink
          href='https://www.twitter.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fa-brands fa-twitter'></i>
        </SocialMediaLink>
        
        <SocialMediaLink
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='fa-brands fa-linkedin'></i>
        </SocialMediaLink>
      </SocialMediaSection>
    </FooterContainer>
  )
}

export default Footer
