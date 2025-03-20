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
  school: "",
  degree: "",
  fieldOfStudy: "",
  graduationYear: "",
};

const profileConfig = [
  {
    step: 1,
    title: "Basic Information",
    rows: false,
    fields: [
      { label: "First Name", key: "firstName", id: "firstName" },
      { label: "Last Name", key: "lastName", id: "lastName" },
      { label: "Email", key: "email", id: "email" },
      { label: "Phone Number", key: "phoneNumber", id: "phoneNumber" },
    ],
  },
  {
    step: 2,
    title: "Address Information",
    rows: false,
    fields: [
      { label: "Street", key: "street", id: "street" },
      { label: "City", key: "city", id: "city" },
      { label: "Zip Code", key: "zipCode", id: "zipCode" },
      { label: "State", key: "state", id: "state" },
      { label: "Country", key: "country", id: "country" },
    ],
  },
  {
    step: 3,
    title: "Social Links",
    rows: true,
    fields: [
      { label: "GitHub", key: "github", id: "github" },
      { label: "LinkedIn", key: "linkedin", id: "linkedin" },
      { label: "Portfolio/Website", key: "portfolio", id: "portfolio" },
    ],
  },
  {
    step: 4,
    title: "Resume",
    rows: true,
    fields: [],
    isFile: true,
  },
  {
    step: 5,
    title: "Education",
    rows: false,
    fields: [
      { label: "School", key: "school", id: "school" },
      { label: "Degree", key: "degree", id: "degree" },
      { label: "Field of Study", key: "fieldOfStudy", id: "fieldOfStudy" },
      { label: "Graduation Year", key: "graduationYear", id: "graduationYear" },
    ],
  },
];

export { initialData, profileConfig };
