export interface IProfileAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IProfileBio {
  about: string;
  jobTitle: string;
  dob: string;
  education: string;
  gender: string;
}

export interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profile?: {
    address: IProfileAddress;
    bio: IProfileBio;
    financial: {
      budget: number;
    };
  };
}

export interface IUpdateUserProfile {
  firstName: string;
  lastName: string;
  profile: {
    address: IProfileAddress;
    bio: IProfileBio;
    financial: {
      budget: number;
    };
  };
}
