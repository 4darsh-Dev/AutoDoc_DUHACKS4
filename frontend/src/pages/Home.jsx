import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import analysisImg from '../assets/img/analysis.png'
import moneyImg from '../assets/img/money.png'
import voteImg from '../assets/img/vote.png'
import eduCap from '../assets/img/education-cap.png'
import healthHeart from '../assets/img/health.png'
import mapPointer from '../assets/img/location.png'
import manRunning from '../assets/img/running.png'
import tank from '../assets/img/tank.png'
import idCard from '../assets/img/id-card.png'
import moneyBag from '../assets/img/finance.png'
import stepsImg from '../assets/img/steps.png'
import compassImg from '../assets/img/compass.png'
import aboutImg from '../assets/img/about.png'

const Hero = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #232323;
  color: white;
  height: 50vh;
  gap: 10px;
  padding: 0 20vw;
`
const HeroH1 = styled.h1`
  text-align: center;
`
const ScannerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 1rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`
const QuickLinksSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 10vw;
  gap: 20px;
`
const QuickLinksCards = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`
const QuickLinkCard = styled.section.withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop)
})`
  display: flex;
  background-color: ${({ color }) => color || 'white'};
  padding: 10px;
  border-radius: 5px;
  gap: 5px;
  align-items: center;
  transition: transform 0.3s ease;
  box-shadow: 1px 4px 8px 1px #8c8c8c;
  &:hover {
    transform: scale(1.1);
  }
`
const QuickLinkCardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`
const QuickLinkCardImg = styled.img`
  height: 50px;
`
const ButtonLinks = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
`
const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10vh 10vw;
  align-items: center;
  gap: 50px;
`
const CategoryHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const CategoryCards = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  justify-content: space-evenly;
`
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* gap: 10px; */
`
const CategoryCardImg = styled.img`
  height: 75px;
`
//Steps Section
const StepsSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10vh 10vw;
  gap: 100px;
  background-color: #d6e4f0;
  border-radius: 10px;
`
const StepsText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`
const StepsImg = styled.img`
  height: 500px;
`
const CompassImg = styled.img``

//About section
const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20vh 10vw;
  gap: 100px;
`
const AboutText = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const AboutImg = styled.img`
  height: 300px;
`
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Hero>
        <HeroH1 className='font-ex-large font-bold'>
          Experience the Future of Secure Document Storage with{' '}
          <span className='color-primary '>Auto-Doc</span>
        </HeroH1>
        <h3 className='font-mid-medium'>
          Issue Verify and Store with Confidence
        </h3>
        <ScannerDiv>
          <span
            className='material-symbols-outlined'
            style={{ color: 'black' }}
            onClick={() => {
              navigate('/upload')
            }}
          >
            document_scanner
          </span>
        </ScannerDiv>
      </Hero>

      <QuickLinksSection>
        <QuickLinksCards>
          <h1 className='font-large font-bold'>
            Quick <span className='color-primary'> Links</span>{' '}
          </h1>
          <QuickLinkCard color='#A7C1F2'>
            <QuickLinkCardText>
              <h3 className='font-bold'>X and XII Documents </h3>
              <p className='font-ex-small'>
                Now download your marksheets with other essential documents
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={analysisImg} alt='Analysis' />
          </QuickLinkCard>
          <QuickLinkCard color='#FE8B8B'>
            <QuickLinkCardText>
              <h3 className='font-bold'>Banking Documents </h3>
              <p className='font-ex-small'>
                Enjoy your savings and earning with best way to utilizing
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={moneyImg} alt='Analysis' />
          </QuickLinkCard>
          <QuickLinkCard color='#B1B9FD'>
            <QuickLinkCardText>
              <h3 className='font-bold'>Voting Documents </h3>
              <p className='font-ex-small'>
                You are the one who rule yourself by voting to the rulers
              </p>
              <button className='btn-secondary font-ex-small'>View</button>
            </QuickLinkCardText>
            <QuickLinkCardImg src={voteImg} alt='Analysis' />
          </QuickLinkCard>
        </QuickLinksCards>
        <ButtonLinks>
          <button className='btn-secondary font-small'>Aadhar Card</button>
          <button className='btn-secondary font-small'>Voter Id</button>
          <button className='btn-secondary font-small'>
            X & XII Marksheets
          </button>
          <button className='btn-secondary font-small'>
            Property Documents
          </button>
          <button className='btn-secondary font-small'>
            Educational Certificates
          </button>
          <button className='btn-secondary font-small'>
            Banking Documents
          </button>
        </ButtonLinks>
      </QuickLinksSection>

      <AboutSection>
        <AboutText>
          <h1 className='font-large font-bold'>About us</h1>
          <p>
            Our platform is a groundbreaking initiative that enhances digital
            empowerment by providing secure access to authentic documents
            through a state-of-the-art digital interface. Leveraging AI and
            blockchain technology, it offers a reliable cloud-based solution for
            the generation, storage, verification, and retrieval of essential
            documents. Designed for both individuals and organizations, our
            platform ensures security, transparency, and efficiency, empowering
            users to manage their vital documents with confidence and ease.
          </p>
        </AboutText>
        <AboutImg src={aboutImg} />
      </AboutSection>
      <CategorySection>
        <CategoryHeading>
          <h1 className='font-large font-bold'>
            Find Your Document Based on{' '}
            <span className='color-primary'>Category</span>
          </h1>
        </CategoryHeading>
        <CategoryCards>
          <CategoryCard>
            <CategoryCardImg src={eduCap} alt='graduation cap' />
            <span className='font-mid-bold'>Learning and Education </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={mapPointer} alt='map pointer' />
            <span className='font-mid-bold'>Property </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={idCard} alt='id card' />
            <span className='font-mid-bold'>Identity & Docs </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={moneyBag} alt='Money bad' />
            <span className='font-mid-bold'>Bank </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={tank} alt='tank' />
            <span className='font-mid-bold'>Ministry of Defence </span>
          </CategoryCard>
        </CategoryCards>
        <CategoryCards>
          <CategoryCard>
            <CategoryCardImg src={manRunning} alt='man running' />
            <span className='font-mid-bold'>Sports and Activities </span>
          </CategoryCard>
          <CategoryCard>
            <CategoryCardImg src={healthHeart} alt='health' />
            <span className='font-mid-bold'>Health and wellness </span>
          </CategoryCard>
        </CategoryCards>
      </CategorySection>

      <StepsSection>
        <StepsText>
          <CompassImg src={compassImg} />
          <h1 className='font-bold font-large'>
            Let’s start verification with few and simple steps!
          </h1>
          <h3 className=''>
            Upload, verify, and securely store your documents with our
            application. Experience seamless document management with advanced
            security features, ensuring your data remains safe and easily
            accessible whenever you need it
          </h3>
          <button className='btn'>Get Started</button>
        </StepsText>
        <StepsImg src={stepsImg} />
      </StepsSection>
    </>
  )
}

export default Home
