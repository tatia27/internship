import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "../headers/header/header";
import HeaderIntern from "../headers/headerIntern/headerIntern";
import HeaderCompany from "../headers/headerCompany/headerCompany";
import Main from "../main/main";
import Instructions from "../instructions/instructions";
import Footer from "../footers/footer/footer";
import FooterCompany from "../footers/footerCompany/footerCompany";
import FooterIntern from "../footers/footerIntern/footerIntern";
import Registration from "../registration/register/registration";
import RegistrationIntern from "../registration/registrationIntern/registrationIntern";
import RegistrationCompany from "../registration/registrationCompany/registrationCompany";
import ProfileCompany from "../profile/profileCompany/profileCompany";
import Filter from "../filter/filter/filter";
import Popular from "../popular/popular";
import ProfileStudent from "../profile/profileIntern/profileIntern";
import Internship from "../internships/internship/internship";
import Resume from "../resume/resume";
import Authorization from "../authorization/authorization";
import AddInternship from "../internships/addInternship/addInternship";
import CompanyInfo from "../profile/companyInfo/companyInfo";
import { CompanyContextProvider } from "../../context/companyContext";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
// import { UserConternProvider } from "../../context/userContext";

function App() {
  const [isStudent, setStudent] = useState(false);
  const [isCompany, setComapny] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setComapny(location.pathname.includes("/profileCompany"));
  }, [location]);
  React.useEffect(() => {
    setStudent(location.pathname.includes("/profileIntern"));
  }, [location]);

  const renderHeader = () => {
    if (isStudent) {
      return <HeaderIntern />;
    } else if (isCompany) {
      return <HeaderCompany />;
    } else {
      return <Header />;
    }
  };

  const renderFooter = () => {
    if (isStudent) {
      return <FooterIntern />;
    } else if (isCompany) {
      return <FooterCompany />;
    } else {
      return <Footer />;
    }
  };

  return (
    <div className="App">
      {/* <UserConternProvider> */}
      {renderHeader()}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Instructions />
              <Popular />
            </>
          }
        />

        <Route path="/internships" element={<Filter />} />
        <Route path="/internships/:id" element={<Internship />} />
        <Route path="/addInternship" element={<AddInternship />} />

        <Route path="/registration" element={<Registration />} />
        <Route
          path="/registration/registation-intern"
          element={<RegistrationIntern />}
        />
        <Route
          path="/registration/registation-company"
          element={<RegistrationCompany />}
        />
        <Route path="/login" element={<Authorization />} />
        <Route
          path="/registration/registartion-compamy"
          element={<Authorization />}
        />
        <Route
          path="/registration/registartion-intern"
          element={<Authorization />}
        />

        <Route path="/profileIntern/:id/resume" element={<Resume />} />
        <Route path="/profileIntern/:id" element={<ProfileStudent />} />

        <Route path="/profileCompany" element={<ProfileCompany />} />
        <Route
          path="/profileCompany/:id"
          element={
            <CompanyContextProvider>
              <ProfileCompany />
            </CompanyContextProvider>
          }
        />
        <Route
          path="/profileCompany/:id/company-info"
          element={
            <CompanyContextProvider>
              <CompanyInfo />
            </CompanyContextProvider>
          }
        />
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
