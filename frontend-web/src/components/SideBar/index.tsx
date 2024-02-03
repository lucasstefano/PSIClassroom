import { useEffect, useState } from "react";
import { ActiveButtonMenu, ButtonContainer, ButtonIconMenu, ButtonMenu, ButtonTextMenu, LogoContainer, LogoIMG, CourseContainer, SideBarDiv, UserContainer, UserInfoContainer, UserName, UserPicContainer, UserRole, Favs, IconLogout, LogoutIMG, UserPic } from "./style";
import logoimg from "../../assets/Sidebar/logo-classroom.svg";
import home from "../../assets/Sidebar/icon-home.svg";
import courses from "../../assets/Sidebar/icon-course.svg";
import add from "../../assets/Sidebar/icon-add.svg";
import logout from "../../assets/Sidebar/icon-logout.svg";
import userbase from "../../assets/Sidebar/img-perfilbase.svg";
import userService from "../../services/userService";

interface SideBarProps {
  page: number;
}

interface CoursesInfo {
  id: string;
  title: string;
  description: string;
  color: string;
}

export default function SideBar({ page }: SideBarProps) {
  const [Role, SetRole] = useState("instrutor");
  const userPicUrl = "../../assets/Sidebar/img-perfilbase.svg";
  const [userPic, setUserPic] = useState(userbase);
  const coursesData = [
    { title: 'Aula de React Native', color: '#A5DEA9' },
    { title: 'Aula de React Native', color: '#A5DEA9' },
  
    
  ];

  const [data, setData] = useState<CoursesInfo[]>([]);

  useEffect(() => {
    const getCourses = () => {
      userService.getCourses().then(response => {
          console.log(response?.data)
          setData(response?.data)

      }).catch(e => {
          console.log(e)
      })
  };
  
   getCourses();
  }, []);
  
  return (
    <SideBarDiv>

      <LogoContainer>
        <LogoIMG src={logoimg} />
      </LogoContainer>

      <ButtonContainer>

        {page === 1 ? (
          <ActiveButtonMenu href="/">
            <ButtonIconMenu src={home} />
            <ButtonTextMenu href="/">Home</ButtonTextMenu>
          </ActiveButtonMenu>
        ) : (
          <ButtonMenu href="/">
            <ButtonIconMenu src={home} />
            <ButtonTextMenu href="/">Home</ButtonTextMenu>
          </ButtonMenu>
        )}

        {page === 2 ? (
          <ActiveButtonMenu href="/courses">
            <ButtonIconMenu src={courses} />
            <ButtonTextMenu href="/courses">Cursos</ButtonTextMenu>
          </ActiveButtonMenu>
        ) : (
          <ButtonMenu href="/courses">
            <ButtonIconMenu src={courses} />
            <ButtonTextMenu href="/courses">Cursos</ButtonTextMenu>
          </ButtonMenu>
        )}

      </ButtonContainer>

      <CourseContainer>
        {Role === "instrutor" && (
          <ButtonMenu href="/CreateCourse">
            <ButtonIconMenu src={add} />
            <ButtonTextMenu>Criar Curso</ButtonTextMenu>
          </ButtonMenu>)}

        {data.slice(0,9).map((data, index) => (
          <ButtonMenu href="/Lessons">
            <Favs style={{ backgroundColor: data.color }}/>
            <ButtonTextMenu>{data.title}</ButtonTextMenu>
          </ButtonMenu>
        ))}

     

      </CourseContainer>

      <UserContainer href='/User'>
        <UserPicContainer><UserPic src={userPic} /></UserPicContainer>
        <UserInfoContainer>
          <UserName>Lucas Stefano</UserName>
          <UserRole>Aluno</UserRole>
        </UserInfoContainer>
        <IconLogout href="/Login">
          <LogoutIMG src={logout} alt="Logout" />
        </IconLogout>
      </UserContainer>

    </SideBarDiv>

  );
}