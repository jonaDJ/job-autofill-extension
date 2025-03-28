const basicInfoSelectors = [
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
      'spl-input[id="first-name-input"]',
      'input[label="First Name"]',
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
      'spl-input[id="last-name-input"]',
      'input[label="Last Name"]',
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
      'input[name="job_application[email]"]',
      "input#email",
      'input[name="email"]',
      'input[id="email"]',
      'input[name="applicantEmail"]',
      'input[name="candidateEmail"]',
      'input[name="_systemfield_email"]',
      'spl-input[id="email-input"]',
      'spl-input[id="confirm-email-input"]',
    ],
    valueKey: "email",
  },
  {
    selectors: [
      'input[name="job_application[phone]"]',
      "input#phone",
      'input[name="phoneNumber"]',
      'input[id="phoneNumber"]',
      'input[name="phone"]',
      'input[id="phone"]',
      'input[name="candidatePhone"]',
      'input[label="Phone Number"]',
      'input[placeholder="1-415-555-1234..."]',
      {
        shadowPath: [
          'spl-phone-field[label="Phone number"]',
          "spl-input",
          "input",
        ],
      },
    ],
    valueKey: "phoneNumber",
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
  {
    selectors: [
      'input[id="candidate-location"]',
      'input[name="job_application[location]"]',
      {
        shadowPath: [
          'spl-autocomplete[label="Place of residence"]',
          "spl-input",
          "input",
        ],
      },
    ],
    valueResolver: (profile) =>
      `${profile.city}, ${profile.state}, ${profile.country}`,
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
      'input[aria-label="LinkedIn Profile"]',
      'spl-input[id="linkedin-input"]',
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
      'input[aria-label="Website"]',
      'spl-input[id="website-input"]',
    ],
    valueResolver: (profile) => {
      // Prioritize LinkedIn, GitHub, or Portfolio
      return profile.portfolio || profile.linkedin || profile.github || "";
    },
  },
];

const educationSelectors = [
  {
    selectors: [
      'input[name="school"]',
      'input[id="school"]',
      'input[placeholder="School Name"]',
    ],
    valueKey: "school",
  },
  {
    selectors: [
      'input[name="degree"]',
      'input[id="degree"]',
      'input[placeholder="Degree"]',
    ],
    valueKey: "degree",
  },
  {
    selectors: [
      'input[name="field_of_study"]',
      'input[id="field_of_study"]',
      'input[placeholder="Field of Study"]',
    ],
    valueKey: "fieldOfStudy",
  },
  {
    selectors: [
      'input[name="graduation_year"]',
      'input[id="graduation_year"]',
      'input[placeholder="Graduation Year"]',
    ],
    valueKey: "graduation",
  },
  {
    selectors: [
      'input[name="gpa"]',
      'input[id="gpa"]',
      'input[placeholder="GPA"]',
    ],
    valueKey: "gpa",
  },
  {
    selectors: [
      'input[name="honors"]',
      'input[id="honors"]',
      'input[placeholder="Honors"]',
    ],
    valueKey: "honors",
  },
  {
    selectors: [
      'input[name="location"]',
      'input[id="location"]',
      'input[placeholder="Location"]',
    ],
    valueKey: "eduLocation",
  },
];

const experienceSelectors = [
  {
    selectors: [
      'input[name="title"]',
      'input[id="title"]',
      'input[placeholder="Title"]',
    ],
    valueKey: "position",
  },
  {
    selectors: [
      'input[name="company"]',
      'input[id="company"]',
      'input[placeholder="Company"]',
    ],
    valueKey: "company",
  },
  {
    selectors: [
      'input[name="industry"]',
      'input[id="industry"]',
      'input[placeholder="Industry"]',
    ],
    valueKey: "industry",
  },
  {
    selectors: [
      'textarea[name="summary"]',
      'textarea[id="summary"]',
      'textarea[placeholder="Summary"]',
    ],
    valueKey: "description",
  },
  {
    selectors: [
      'input[name="start_date"]',
      'input[id="start_date"]',
      'input[placeholder="MM/YYYY"]',
    ],
    valueKey: "startDate",
  },
  {
    selectors: [
      'input[name="end_date"]',
      'input[id="end_date"]',
      'input[placeholder="MM/YYYY"]',
    ],
    valueKey: "endDate",
  },
];

export { basicInfoSelectors, educationSelectors, experienceSelectors };
