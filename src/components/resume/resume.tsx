import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import "./resume.css";

export type Cv = {
  age: number | null;
  location: string;
  levelOfEducation: string;
  educationalInstitution: string;
  specialization: string;
  hardSkills: string;
  softSkills: string;
};

function Resume() {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [resume, setResume] = useState<Cv>({
    age: null,
    location: "",
    levelOfEducation: "Bachelor",
    educationalInstitution: "",
    specialization: "",
    hardSkills: "",
    softSkills: "",
  });

  const handleResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !resume.age ||
        !resume.location ||
        !resume.levelOfEducation ||
        !resume.educationalInstitution ||
        !resume.specialization ||
        !resume.hardSkills ||
        !resume.softSkills
      ) {
        toast.info("Заполните все поля формы");
        return;
      }
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/v1/intern/${user?.id}/resume`,
        resume,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate(`/intern/profile`);
    } catch (error) {
      toast.error("Стажировка не создана");
    }
  };

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResume({ ...resume, [event.target.name]: event.target.value });
  };

  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResume({ ...resume, [event.target.name]: event.target.value });
  };

  return (
    <div className="resume">
      <div className="container">
        <h1 className="resume-title">Резюме</h1>
        <form
          method="post"
          className="resume-internship__form"
          onSubmit={handleResume}
        >
          <input
            type="text"
            name="age"
            placeholder="Возраст"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <input
            type="text"
            name="location"
            placeholder="Местоположение"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <select
            name="levelOfEducation"
            className="resume-input"
            onChange={changeSelectHandler}
            defaultValue="Bachelor"
          >
            <option value="Bachelor">Бакалавриат</option>
            <option value="Master">Специалитет</option>
            <option value="Specialist">Магистратура</option>
          </select>
          <input
            type="text"
            name="educationalInstitution"
            placeholder="Учебное заведение"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Специализация"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <input
            type="text"
            name="hardSkills"
            placeholder="Hard skills"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <input
            type="text"
            name="softSkills"
            placeholder="Soft skills"
            className="resume-input"
            onChange={changeInputHandler}
          />
          <button className="resume-button">Создать</button>
        </form>
      </div>
    </div>
  );
}

export default Resume;
