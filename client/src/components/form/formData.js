export const expertiseInput = [
  {
    type: "file",
    name: "image",
    errorMessage: "Image Require",
  },

  {
    label: "Level",
    type: "text",
    name: "level",
    errorMessage: "Level required",
  },
  {
    label: "Name",
    type: "text",
    name: "name",
    errorMessage: "Title required",
  },
];

export const experienceInput = [
  {
    type: "date",
    name: "startDate",
    errorMessage: "Date required",
  },
  {
    type: "date",
    name: "endDate",
    errorMessage: "Date required",
  },
  {
    type: "file",
    name: "image",
    errorMessage: "Image Require",
  },
  {
    label: "Company",
    type: "text",
    name: "company",
    errorMessage: "Company name required",
  },
  {
    label: "Position",
    type: "text",
    name: "position",
    errorMessage: "Position required",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    errorMessage: "Description required",
  },
  {
    label: "Technologies",
    type: "text",
    name: "technologies",
    errorMessage: "technologies required",
  },
];

export const projectInput = [
  {
    type: "file",
    name: "image",
    errorMessage: "Image Require",
  },
  {
    type: "date",
    name: "date",
    errorMessage: "Date required",
  },
  {
    label: "Title",
    type: "text",
    name: "title",
    errorMessage: "Title Require",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    errorMessage: "Description required",
  },
  {
    label: "Technologies",
    type: "text",
    name: "technologies",
    errorMessage: "Technologies required",
  },
  {
    label: "Demo",
    type: "text",
    name: "url",
    errorMessage: "Url required",
  },
];

export const getInput = (type) => {
  switch (type) {
    case "expertise":
      return expertiseInput;
    case "experience":
      return experienceInput;
    case "project":
      return projectInput;
    default:
      return [];
  }
};
