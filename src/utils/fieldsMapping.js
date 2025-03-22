const fieldMappings = [
  // Name
  {
    selectors: [
      'input[name="job_application[first_name]"]',
      "input#first_name",
      'input[name="firstName"]',
      'input[id="firstName"]',
      'input[id="firstname"]',
      'input[name="applicantFirstName"]',
      'input[placeholder="First name"]',
      'input[name="_systemfield_name"]',
    ],
    valueKey: "firstName",
  },
  {
    selectors: [
      'input[name="job_application[last_name]"]',
      "input#last_name",
      'input[name="lastName"]',
      'input[id="lastName"]',
      'input[id="lastname"]',
      'input[name="applicantLastName"]',
      'input[placeholder="Last name"]',
    ],
    valueKey: "lastName",
  },
  {
    selectors: [
      'input[name="name"]',
      'input[id="name"]',
      'input[placeholder="Name"]',
      'input[name="full_name"]',
      'input[name="candidateName"]',
      'input[id="full_name"]',
    ],
    valueResolver: (profile) =>
      `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
  },

  // Contact
  {
    selectors: [
      'input[name="job_application[phone]"]',
      "input#phone",
      'input[name="phoneNumber"]',
      'input[id="phoneNumber"]',
      'input[name="phone"]',
      'input[id="phone"]',
      'input[name="candidatePhone"]',
      'input[placeholder="1-415-555-1234..."]',
    ],
    valueKey: "phoneNumber",
  },
  {
    selectors: [
      'input[name="job_application[email]"]',
      "input#email",
      'input[name="email"]',
      'input[id="email"]',
      'input[name="applicantEmail"]',
      'input[name="candidateEmail"]',
      'input[name="_systemfield_email"]',
    ],
    valueKey: "email",
  },

  // Address
  {
    selectors: [
      'input[name="job_application[street]"]',
      "input#street",
      'input[name="street"]',
      'input[id="street"]',
      'input[name="addressLine1"]',
    ],
    valueKey: "street",
  },
  {
    selectors: [
      'input[name="job_application[city]"]',
      "input#city",
      'input[name="city"]',
      'input[id="city"]',
      'input[name="applicantCity"]',
      'input[name="job_application[location]"]', // Could be a simple location
    ],
    valueKey: "city",
  },
  {
    selectors: [
      'input[name="job_application[zip_code]"]',
      "input#zip_code",
      'input[name="zipCode"]',
      'input[id="zipCode"]',
      'input[name="postalCode"]',
    ],
    valueKey: "zipCode",
  },
  {
    selectors: [
      'input[name="job_application[state]"]',
      "input#state",
      'input[name="state"]',
      'input[id="state"]',
      'input[name="applicantState"]',
    ],
    valueKey: "state",
  },
  {
    selectors: [
      'input[name="job_application[country]"]',
      "input#country",
      'input[name="country"]',
      'input[id="country"]',
      'input[name="applicantCountry"]',
    ],
    valueKey: "country",
  },

  // Social Links
  {
    selectors: [
      'input[name="job_application[github]"]',
      "input#github",
      'input[name="github"]',
      'input[id="github"]',
      'input[name="applicantGithub"]',
      'input[placeholder="GitHub URL"]',
    ],
    valueKey: "github",
  },
  {
    selectors: [
      'input[name="job_application[linkedin]"]',
      "input#linkedin",
      'input[name="linkedin"]',
      'input[id="linkedin"]',
      'input[name="applicantLinkedIn"]',
      'input[placeholder="LinkedIn URL"]',
    ],
    valueKey: "linkedin",
  },
  {
    selectors: [
      'input[name="job_application[portfolio]"]',
      "input#portfolio",
      'input[name="portfolio"]',
      'input[id="portfolio"]',
      'input[name="applicantPortfolio"]',
      'input[placeholder="Portfolio URL"]',
    ],
    valueKey: "portfolio",
  },
  {
    selectors: [
      'input[placeholder="URL (LinkedIn, Github, Portfolio)"]',
      'input[name="urls[0]"]',
      'input[name="url"]',
      'input[id="url"]',
      'input[placeholder="URL"]',
    ],
    valueResolver: (profile) => {
      // Prioritize LinkedIn, GitHub, or Portfolio
      return profile.linkedin || profile.github || profile.portfolio || "";
    },
  },
];

const fieldEducationMappings = [
  {
    selectors: [
      'input[name="school"]',
      'input[id="school"]',
      'input[placeholder="School Name"]',
    ],
    valueKey: "edu_school",
  },
  {
    selectors: [
      'input[name="degree"]',
      'input[id="degree"]',
      'input[placeholder="Degree"]',
    ],
    valueKey: "edu_degree",
  },
  {
    selectors: [
      'input[name="field_of_study"]',
      'input[id="field_of_study"]',
      'input[placeholder="Field of Study"]',
    ],
    valueKey: "edu_fieldOfStudy",
  },
  {
    selectors: [
      'input[name="graduation_year"]',
      'input[id="graduation_year"]',
      'input[placeholder="Graduation Year"]',
    ],
    valueKey: "edu_graduationYear",
  },
  {
    selectors: [
      'input[name="gpa"]',
      'input[id="gpa"]',
      'input[placeholder="GPA"]',
    ],
    valueKey: "edu_gpa",
  },
  {
    selectors: [
      'input[name="honors"]',
      'input[id="honors"]',
      'input[placeholder="Honors"]',
    ],
    valueKey: "edu_honors",
  },
  {
    selectors: [
      'input[name="location"]',
      'input[id="location"]',
      'input[placeholder="Location"]',
    ],
    valueKey: "edu_location",
  },
  {
    selectors: [
      'textarea[name="relevant_courses"]',
      'textarea[id="relevant_courses"]',
      'textarea[placeholder="Relevant Courses"]',
    ],
    valueKey: "edu_relevantCourses",
  },
];

export { fieldMappings, fieldEducationMappings };
