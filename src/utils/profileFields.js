const educationData = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  graduationYear: "",
};

const initialData = {
  // Basic Information
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",

  // Address Information
  street: "",
  city: "",
  zipCode: "",
  state: "",
  country: "",

  // Social Links
  github: "",
  linkedin: "",
  portfolio: "",

  // Education
  education: [educationData],
};

const profileConfig = [
  {
    step: 1,
    rows: false,
    fields: [
      {
        title: "Basic Information",
        fields: [
          { label: "First Name", key: "firstName", id: "firstName" },
          { label: "Last Name", key: "lastName", id: "lastName" },
          { label: "Email", key: "email", id: "email" },
          { label: "Phone Number", key: "phoneNumber", id: "phoneNumber" },
        ],
      },
      {
        title: "Address Information",
        fields: [
          { label: "Street", key: "street", id: "street" },
          { label: "City", key: "city", id: "city" },
          { label: "Zip Code", key: "zipCode", id: "zipCode" },
          { label: "State", key: "state", id: "state" },
          { label: "Country", key: "country", id: "country" },
        ],
      },
    ],
  },
  {
    step: 2,
    rows: true,
    fields: [
      {
        title: "Social Links",
        fields: [
          { label: "GitHub", key: "github", id: "github" },
          { label: "LinkedIn", key: "linkedin", id: "linkedin" },
          { label: "Portfolio/Website", key: "portfolio", id: "portfolio" },
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
    rows: true,
    fields: [
      {
        title: "Education",
        isArray: true,
        fields: [
          { label: "School", key: "school", id: "school" },
          { label: "Degree", key: "degree", id: "degree" },
          { label: "Field of Study", key: "fieldOfStudy", id: "fieldOfStudy" },
          {
            label: "Graduation Year",
            key: "graduationYear",
            id: "graduationYear",
          },
        ],
      },
    ],
  },
];

export { initialData, profileConfig, educationData };
