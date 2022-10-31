import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './App.css';

const projects = require('./info.json');

const Header = props => {
  let [nowPage, setNowPage] = props.page;
  const onClickButton = page => e => {
    let [nowProject, setNowProject] = props.state;
    if(nowProject) setNowProject(null);
    setNowPage(page);
    for(let i in e.target.parentNode.children) {
      try{
        e.target.parentNode.children[i].classList.remove('nav-select');
        e.target.parentNode.children[i].classList.add('nav-unselect');
      } catch{}
    }
    e.target.classList.remove('nav-unselect');
    e.target.classList.add('nav-select');
  }
  return (
    <div className='header'>
      <div className='title' onClick={() => window.location.reload()}>
        <div className='t1'>D.G. YUN-ARCHITECTS</div>
        <div className='t2'>디자인그룹윤건축사사무소</div>
      </div>
      <div className='nav'>
        <div className='nav-btn nav-unselect' onClick={onClickButton(0)}>ABOUT</div>
        {
          nowPage === 1 ? 
            <div className='nav-btn nav-select' onClick={onClickButton(1)}>PROJECTS</div> :
            <div className='nav-btn nav-unselect' onClick={onClickButton(1)}>PROJECTS</div>
        }
        <div className='nav-btn nav-unselect' onClick={onClickButton(2)}>CONTACT</div>
      </div>
    </div>
  );
}

const ProjectsElement = (props) => {
  const e = props.e;
  let [nowProject, setNowProject] = props.state;
  
  const imgClick = () => {
    // console.log(e);
    setNowProject(e);
  }
  return (
    <LazyLoadImage
      className='project-image'
      height={200}
      width={300}
      src={`${process.env.PUBLIC_URL}projects/${e.url}/0.${e.type}`}
      effect="blur"
      onClick={imgClick}
    />
  )
}
const ProjectsSlide = (props) => {
  let [nowProject, setNowProject] = props.state;
  let [nowImage, setNowImage] = useState(0);
  console.log(nowProject);
  return (
    <div className='projects-slide'>
      <LazyLoadImage
        className='projects-slide-image'
        height={600}
        width={900}
        src={`${process.env.PUBLIC_URL}projects/${nowProject.url}/${nowImage}.${nowProject.type}`}
        effect="blur"
        onClick={() => {
          setNowImage((nowImage + 1) % nowProject.many);
        }}
      />

      <div className='projects-slide-title'>{nowProject.name}</div>
    </div>
  )
}

const Projects = props => {
  let [nowProject, setNowProject] = props.state;
  return (
    <div className='projects'>
      {
        !nowProject ? 
          projects.map((project, index) => {
            return (
              <ProjectsElement key={index} e={project} state={[nowProject, setNowProject]}></ProjectsElement>
            );
          }) : 
          <ProjectsSlide state={[nowProject, setNowProject]}/>
      }
    </div>
  )
}

const Contact = () => {
  return (
    <div className='contact'>
      <div className='address'>
        <div className='address-title'>Address</div>
        <div className='adress-content'>
          <div className='address-content-box'>
            <div className='address-linner address-adress'>부산광역시 수영구 남천1동</div>
            <div className='address-linner address-address'>광남로10번길 2 동남빌딩 4,5층</div>
          </div>
          <div className='address-content-box'>
            <div className='address-linner address-phone'>+82 051 911 9011</div>
            <div className='address-linner address-email'>yun-archi16@daum.net</div>
          </div>
        </div>
      </div>
      <div className='map'>
        <div className='map-title'>Map</div>
        <div className='map-map loading'></div>
      </div>

    </div>
  )
}

const About = () => {
  return (
    <div className='about'>
      <div className='about-dec'>
        <div className='about-dec-inner'>윤건축사사무소는 사용자 요구에 부합하는 공간을 만들어내는 그룹입니다.
        사용자에 맞추어 설계하여 창의적인 공간과 가치 있는 공간 제공을 목표로 합니다.</div>
      </div>
      <div className='about-person'>
        <div className='about-person-box about-person-name'>장윤선</div>
        {
          [
            '건축사(대한건축사협회정회원)',
            '부경대학교 건축학과 겸임교수',
            'CVS(Certified Value Specialist)',
            'VMP(가치혁신전문가)',
            '녹색건축인증전문자',
            '부산광역시, 양산시 공공건축가(2기)',
            '학교공간혁신촉진자',
            '부산광역시 건축정책위원',
            '부산광역시 건설기술심의위원',
            '부산광역시 소방청사자문위원',
            '경상남도 지방건설심의위원',
            '수영구,북구,남구,영도구 건축심의위원'
          ].map((e, index) => {
            return (
              <div className='about-person-box' key={index}>{e}</div>
            )
          })
        }
      </div>
    </div>
  )
}


const App = () => {
  let [nowPage, setNowPage] = useState(1);
  let [nowProject, setNowProject] = useState(null);
  return (
    <>
      <Header page={[nowPage, setNowPage]} state={[nowProject, setNowProject]}></Header>
      <div className='inner'>
        {
          nowPage === 0 ?
            <About /> :
          nowPage === 1 ?
            <Projects state={[nowProject, setNowProject]}></Projects> :
          nowPage === 2 ? 
            <Contact /> :
          null
        }
      </div>
    </>
  );
}

export default App;
