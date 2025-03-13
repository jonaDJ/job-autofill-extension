const fieldMappings = [
  {
    selectors: [
      'input[name="job_application[first_name]"]',
      "input#first_name",
      'input[name="firstName"]',
      'input[id="firstName"]',
      'input[name="applicantFirstName"]',
    ],
    valueKey: "firstName",
  },
  {
    selectors: [
      'input[name="job_application[last_name]"]',
      "input#last_name",
      'input[name="lastName"]',
      'input[id="lastName"]',
      'input[name="applicantLastName"]',
    ],
    valueKey: "lastName",
  },
  {
    selectors: [
      'input[name="job_application[phone]"]',
      "input#phone",
      'input[name="phoneNumber"]',
      'input[id="phoneNumber"]',
      'input[name="phone"]',
      'input[id="phone"]',
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
    ],
    valueKey: "email",
  },
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
      'input[name="job_application[location]"]', //could be a simple location
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
];

export { fieldMappings };
