import { UserRole } from "../enums/enums";

// Dashboard types
export interface HeroState {
  data: HeroContent[];
  loading: boolean;
  error: string | null;
}
export interface RecentState {
  data: RecentContent[];
  loading: boolean;
  error: string | null;
}
export interface HighlightState {
  data: HighlightContent[];
  loading: boolean;
  error: string | null;
}
export interface ShowState {
  data: ShowContent[];
  loading: boolean;
  error: string | null;
}
export interface HeroContent {
  heroImageURL: string;
  heroVideoURL: string;
  heroContentTitle: string;
  contentTitle: string;
  category: string;
  subCategory: string;
  videoUrl: string;
  imageUrl: string;
}
export interface RecentContent {
  recentImageURL: string;
  recentVideoURL: string;
  recentContentTitle: string;
}
export interface HighlightContent {
  highlightImageURL: string;
  highlightVideoURL: string;
  highlightContentTitle: string;
}
export interface ShowContent {
  showImageURL: string;
  showVideoURL: string;
  showContentTitle: string;
}
// User types
export interface User {
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  role: string;
  customerStripeId: string;
  phone: string;
  isAccepted: boolean;
  isVerified: boolean;
  emailToken?: string;
}
export interface UpdateUser {
  username: string;
  id: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}
export interface DeactivateUser {
  userId: string;
}
export interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}
export interface SignupPayload {
  userData: User;
}
export interface SigninPayload {
  email: string;
  password: string;
}
// Pricing types
export interface Tier {
  title: string;
  subheader?: string;
  price: string;
  priceId: string;
  unit_duration?: string;
  feature_list: string[];
  buttonText: string;
  buttonVariant: "outlined" | "contained";
}

// Form types
export interface FormValues {
  username: string;
  code: string;
}
export interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isAccepted: boolean;
  role: UserRole;
  showPassword: boolean;
  showConfirmPassword: boolean;
}
export interface SubmissionFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  tiktok: string;
  instagram: string;
  facebook: string;
  title: string;
  contentdesc: string;
  contenturl: string;
  isAccepted: boolean;
  form: File | null;
}
export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  contentdesc: string;
  isAccepted: boolean;
}
export interface UploadVideoModalProps {
  open: boolean;
  handleClose: () => void;
}
