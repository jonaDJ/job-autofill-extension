const experienceData = {
  company: "",
  position: "",
  startDate: null,
  endDate: null,
  description: "",
};

const educationData = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  graduation: null,
  gpa: "",
  honors: "",
  eduLocation: "",
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
  education: educationData,
  demographics: {
    gender: "",
    isHispanicLatino: "",
    veteranStatus: "",
    disabilityStatus: "",
  },
  preferences: {
    salaryExpectations: "",
    authorizedToWork: "",
    willingToRelocate: "",
    workLocationPreference: "",
  },
};

const profileConfig = [
  {
    step: 1,
    fields: [
      {
        title: "Basic Information",
        singleRow: false,
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
        singleRow: false,
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
        singleRow: true,
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
        singleRow: true,
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
        singleRow: true,
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
            type: "textarea",
            rows: 5,
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
        singleRow: false,
        fields: [
          {
            label: "School",
            key: "education.school", // Use dot notation
            id: "education.school",
            type: "string",
          },
          {
            label: "Degree",
            key: "education.degree",
            id: "education.degree",
            type: "string",
          },
          {
            label: "Field of Study",
            key: "education.fieldOfStudy",
            id: "education.fieldOfStudy",
            type: "string",
          },
          {
            label: "Graduation",
            key: "education.graduation",
            id: "education.graduation",
            type: "date",
          },
          {
            label: "GPA",
            key: "education.gpa",
            id: "education.gpa",
            type: "number",
          },
          {
            label: "Honors/Awards",
            key: "education.honors",
            id: "education.honors",
            type: "string",
          },
          {
            label: "Location",
            key: "education.eduLocation",
            id: "education.eduLocation",
            type: "string",
          },
        ],
      },
    ],
  },
  {
    step: 5,
    fields: [
      {
        title: "Demographic Information",
        singleRow: true,
        fields: [
          {
            label: "Gender",
            key: "demographics.gender",
            id: "demographics.gender",
            type: "select",
            options: [
              { value: "", label: "Select..." },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "non-binary", label: "Non-binary" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ],
          },
          {
            label: "Are you Hispanic/Latino?",
            key: "demographics.isHispanicLatino",
            id: "demographics.isHispanicLatino",
            type: "select",
            options: [
              { value: "", label: "Select..." },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ],
          },
          {
            label: "Veteran Status",
            key: "demographics.veteranStatus",
            id: "demographics.veteranStatus",
            type: "select",
            options: [
              { value: "", label: "Select..." },
              { value: "veteran", label: "I am a veteran" },
              { value: "not-veteran", label: "I am not a veteran" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ],
          },
          {
            label: "Disability Status",
            key: "demographics.disabilityStatus",
            id: "demographics.disabilityStatus",
            type: "select",
            options: [
              { value: "", label: "Select..." },
              { value: "yes", label: "Yes, I have a disability" },
              { value: "no", label: "No, I don't have a disability" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ],
          },
        ],
      },
      {
        title: "Job Preferences",
        singleRow: true,
        fields: [
          {
            label: "Salary expectations",
            key: "preferences.salaryExpectations",
            id: "preferences.salaryExpectations",
            type: "string",
            placeholder: "e.g. $80,000 - $100,000",
          },
          {
            label: "Work authorization",
            key: "preferences.authorizedToWork",
            id: "preferences.authorizedToWork",
            type: "select",
            options: [
              { value: "", label: "Select..." },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            label: "Work location preference",
            key: "preferences.workLocationPreference",
            id: "preferences.workLocationPreference",
            type: "select",
            options: [
              { value: "", label: "Select preference..." },
              { value: "remote", label: "Remote only" },
              { value: "hybrid", label: "Hybrid (preferred)" },
              { value: "onsite", label: "On-site" },
              { value: "flexible", label: "Flexible (any option)" },
              { value: "relocatable", label: "Willing to relocate" },
            ],
          },
        ],
      },
    ],
  },
];

export { initialData, profileConfig, experienceData, educationData };
