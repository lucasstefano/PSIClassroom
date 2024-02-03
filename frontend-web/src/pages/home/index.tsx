import { useEffect, useState } from "react";
import { BannerHome } from "../../components/Banner";
import { HeaderPage } from "../../components/Header";
import SideBar from "../../components/SideBar";
import MiniCourses from "../../components/Thumbnail/Courses";
import MiniLessons from "../../components/Thumbnail/Lessons";
import { CoursesContainer, LessonsContainer, RetanguloVermelho, RightScreen, ScreenDiv, SubTitle  } from "./style";
import userService from "../../services/userService";

interface CoursesInfo {
  title: string;
  description: string;
  color: string;
}

interface LessonsInfo {
  title: string;
  description: string;
  color: string;
}
export default function Home() {
  
  const coursesData = [
  { title: 'Aula de React Native', subtitle: 'HTML/CSSI, ReactJS, ReactNative...', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'HTML/CSSI, ReactJS, ReactNative...', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'HTML/CSSI, ReactJS, ReactNative...', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'HTML/CSSI, ReactJS, ReactNative...', color: '#A5DEA9' },

];
const lessonsData = [
  { title: 'Aula de React Native', subtitle: 'Lucas Stefano', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'Lucas Stefano', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'Lucas Stefano', color: '#A5DEA9' },
  { title: 'Aula de React Native', subtitle: 'Lucas Stefano', color: '#A5DEA9' },
];
 
const [dataCourses, setDataCourses] = useState<CoursesInfo[]>([]);
const [dataLesson, setDataLesson] = useState<LessonsInfo[]>([]);


useEffect(() => {
  const getCourses = () => {
    userService.getCourses().then(response => {
        console.log(response?.data)
        setDataCourses(response?.data)

    }).catch(e => {
        console.log(e)
    })
};
const getLesson = () => {
  userService.getCourses().then(response => {
      console.log(response?.data)
      setDataLesson(response?.data)

  }).catch(e => {
      console.log(e)
  })
};

 getCourses();
 getLesson();
}, []);


  return (
    <ScreenDiv>
      <SideBar page={1}/>
      <RightScreen>
        <HeaderPage/>
        <BannerHome title={'Lucas'}/>
        <SubTitle>Cursos</SubTitle>
        <CoursesContainer>
        {dataCourses.slice(0,4).map((data, index) => (
          <MiniCourses key={index} title={data.title} subtitle={data.description} color={data.color} />
        ))}
        </CoursesContainer>
        <SubTitle>Aulas</SubTitle>
        <LessonsContainer>
        {dataLesson.slice(0,6).map((data, index) => (
          <MiniLessons key={index} title={data.title} subtitle={data.description} color={data.color} />
        ))}

        </LessonsContainer>


      </RightScreen>
    </ScreenDiv>
  );
}