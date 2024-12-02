import * as Yup from 'yup';

export const updateUserProfileSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  profile: Yup.object({
    address: Yup.object({
      streetAddress: Yup.string().required('Street address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
    }).required(),
    bio: Yup.object({
      jobTitle: Yup.string().required('Job title is required'),
      dob: Yup.date().required('Date of birth is required'),
      education: Yup.string().required('Education is required'),
      gender: Yup.string().required('Education is required'),
      about: Yup.string().required('About is required'),
    }).required(),
    financial: Yup.object({
      budget: Yup.number()
        .required('Budget is required')
        .positive('Budget must be a positive number'),
    }).required(),
  }),
});
