import { ImageSourcePropType } from "react-native";

export interface UserData {
  id: number;
  name: string;
  avatar: ImageSourcePropType;
  isFollowing?: boolean;
}

export interface renderMessagesProps {
  id: number;
  name: string;
  profileImage: ImageSourcePropType;
  carImage: ImageSourcePropType;
  messages: string[];
  time: string;
}

export interface renderCarInfoProps {
  id: number;
  image: any;
  value: String;
}
export interface renderVehicleOverviewProps {
  id: number;
  make: String;
  trim: String;
  year: String;
  fuelType: String;
  bodyType: String;
  doors: String;
  model: String;
  trimLevel: String;
  mileage: String;
  transmission: String;
  seats: String;
  color: String;
}

export interface FilterProps {
  modalVisible: boolean;
}

export interface CarListProps {
  id: number;
  name: string;
  avatarImg: ImageSourcePropType;
  image: ImageSourcePropType;
  daysAgo: string;
  price: string;
  pricePerMonth?: string;
  car: string;
  location: string;
  sellerType: string;
  isFavorite: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export type CarType = {
  carImage: string[];
  description: string;
  carName: string;
  price: string;
  location: string;
};
export interface CarDetailProps {
  id: number;
  name: string;
  profileImage: string;
  isFavorite: boolean;
  cars: CarType;
  daysAgo: string;
}
export type detail = {
  label: string;
  value: string;
};
export interface CarScanDetail {
  section: string;
  details: detail[];
}

export interface MenuItem {
  title: string;
  icon: ImageSourcePropType;
  pathName?: string;
}
