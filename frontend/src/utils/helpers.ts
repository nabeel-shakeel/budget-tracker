import { IAddress } from '@features/profile/profile.types';

export function getNameInitials(firstName: string, lastName: string): string {
  const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  return initials;
}

export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getFormattedPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

export function getFormattedDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getFullAddress(address: IAddress): string {
  return `${address.streetAddress}, ${address.city}, ${address.state}, ${address.zipCode}`;
}
