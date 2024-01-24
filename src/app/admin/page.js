"use client";

import AdminAboutView from "@/components/admin-view/about";
import AdminContactView from "@/components/admin-view/contact";
import AdminEducationView from "@/components/admin-view/education";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminHomeView from "@/components/admin-view/home";
import AdminProjectView from "@/components/admin-view/project";
import { useEffect, useState } from "react";
import { addData, getData, login, updateData } from "@/services";
import { Button } from "react-scroll";
import { data } from "autoprefixer";

const initialHomeFormData = {
  heading: "",
  summary: "",
};

const initialAboutFormData = {
  aboutme: "",
  noofprojects: "",
  yearofexperience: "",
  noofclients: "",
  skills: "",
};

const initialExperienceFormData = {
  position: "",
  company: "",
  duration: "",
  location: "",
  jobprofile: "",
};

const initialEducationFormData = {
  degree: "",
  year: "",
  college: "",
};

const initialProjectFormData = {
  name: "",
  website: "",
  technologies: "",
  github: "",
};

export default function AdminView() {
  const [currentSelectedTab, setcurentSelectedTab] = useState("home");
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
  const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData);
  const [experienceViewFormData, setExperienceViewFormData] = useState(initialExperienceFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData);
  const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);
  const [allData, setAllData] = useState({});
  const menuItems = [
    {
      id: "home",
      label: "Home",
      component: <AdminHomeView formData={homeViewFormData} setFormData={setHomeViewFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "about",
      label: "About",
      component: <AdminAboutView formData={aboutViewFormData} setFormData={setAboutViewFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "experience",
      label: "Experience",
      component: <AdminExperienceView formData={experienceViewFormData} setFormData={setExperienceViewFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "education",
      label: "Eduaction",
      component: <AdminEducationView formData={educationViewFormData} setFormData={setEducationViewFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "project",
      label: "Project",
      component: <AdminProjectView formData={projectViewFormData} setFormData={setProjectViewFormData} handleSaveData={handleSaveData} />,
    },
    {
      id: "contact",
      label: "Contact",
      component: <AdminContactView />,
    },
  ];

  async function extractAllDatas() {
    const response = await getData(currentSelectedTab);

    if (currentSelectedTab === "home" && response && response.data && response.data.length) {
      setHomeViewFormData(response && response.data[0]);
    }
    if (currentSelectedTab === "about" && response && response.data && response.data.length) {
      setAboutViewFormData(response && response.data[0]);
    }
    if (response?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: response && response.data,
      });
    }
  }

  console.log(allData, "allData");

  async function handleSaveData() {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: educationViewFormData,
      experience: experienceViewFormData,
      project: projectViewFormData,
    };
    const response = await addData(currentSelectedTab, dataMap[currentSelectedTab]);
    console.log(response, "response");

    if (response.success) {
      resetFormDatas();
      extractAllDatas();
    }
  }

  useEffect(() => {
    extractAllDatas();
  }, [currentSelectedTab]);

  function resetFormDatas() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setEducationViewFormData(initialEducationFormData);
    setProjectViewFormData(initialProjectFormData);
  }

  console.log(allData, homeViewFormData, "homeViewFormData");

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              setcurentSelectedTab(item.id);
              resetFormDatas();
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-10 pt-10">{menuItems.map((item) => item.id === currentSelectedTab && item.component)}</div>
    </div>
  );
}
