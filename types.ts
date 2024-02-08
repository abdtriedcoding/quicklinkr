export interface UserProps {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null;
  storageUsed?: number;
}
