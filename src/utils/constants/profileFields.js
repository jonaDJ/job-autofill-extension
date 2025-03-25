const experienceData = {
  company: "",
  position: "",
  startDate: null,
  endDate: null,
  description: "",
};

const educationData = {
  edu_school: "",
  edu_degree: "",
  edu_fieldOfStudy: "",
  edu_graduation: null,
  edu_gpa: "",
  edu_honors: "",
  edu_location: "",
  edu_relevantCourses: "",
};

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  street: "",
  city: "",
  zipCode: "",
  state: "",
  country: "",
  github: "",
  linkedin: "",
  portfolio: "",
  experience: [experienceData],
  ...educationData,
};

const profileConfig = [
  {
    step: 1,
    fields: [
      {
        title: "Basic Information",
        fields: [
          {
            label: "First Name",
            key: "firstName",
            id: "firstName",
            type: "string",
          },
          {
            label: "Last Name",
            key: "lastName",
            id: "lastName",
            type: "string",
          },
          { label: "Email", key: "email", id: "email", type: "email" },
          {
            label: "Phone Number",
            key: "phoneNumber",
            id: "phoneNumber",
            type: "tel",
          },
        ],
      },
      {
        title: "Address Information",
        fields: [
          { label: "Street", key: "street", id: "street", type: "string" },
          { label: "City", key: "city", id: "city", type: "string" },
          { label: "Zip Code", key: "zipCode", id: "zipCode", type: "string" },
          { label: "State", key: "state", id: "state", type: "string" },
          { label: "Country", key: "country", id: "country", type: "string" },
        ],
      },
    ],
  },
  {
    step: 2,
    fields: [
      {
        title: "Social Links",
        fields: [
          {
            label: "GitHub",
            key: "github",
            id: "github",
            type: "url",
            icon: "FaGithub",
          },
          {
            label: "LinkedIn",
            key: "linkedin",
            id: "linkedin",
            type: "url",
            icon: "FaLinkedin",
          },
          {
            label: "Portfolio/Website",
            key: "portfolio",
            id: "portfolio",
            type: "url",
            icon: "FaGlobe",
          },
        ],
      },
      {
        title: "Resume",
        fields: [],
        isFile: true,
      },
    ],
  },
  {
    step: 3,
    fields: [
      {
        title: "Experience",
        isArray: true,
        fields: [
          { label: "Company", key: "company", id: "company", type: "string" },
          {
            label: "Position",
            key: "position",
            id: "position",
            type: "string",
          },
          {
            label: "Start Date",
            key: "startDate",
            id: "startDate",
            type: "date",
          },
          { label: "End Date", key: "endDate", id: "endDate", type: "date" },
          {
            label: "Description",
            key: "description",
            id: "description",
            type: "text",
          },
        ],
      },
    ],
  },
  {
    step: 4,
    fields: [
      {
        title: "Education",
        fields: [
          {
            label: "School",
            key: "edu_school",
            id: "edu_school",
            type: "string",
          },
          {
            label: "Degree",
            key: "edu_degree",
            id: "edu_degree",
            type: "string",
          },
          {
            label: "Field of Study",
            key: "edu_fieldOfStudy",
            id: "edu_fieldOfStudy",
            type: "string",
          },
          {
            label: "Graduation Year",
            key: "edu_graduation",
            id: "edu_graduation",
            type: "date",
          },
          { label: "GPA", key: "edu_gpa", id: "edu_gpa", type: "number" },
          {
            label: "Honors/Awards",
            key: "edu_honors",
            id: "edu_honors",
            type: "string",
          },
          {
            label: "Location",
            key: "edu_location",
            id: "edu_location",
            type: "string",
          },
          {
            label: "Relevant Courses",
            key: "edu_relevantCourses",
            id: "edu_relevantCourses",
            type: "text",
          },
        ],
      },
    ],
  },
];

export { initialData, profileConfig, experienceData, educationData };
