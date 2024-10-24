import { assets } from "@/index";
import { Dimensions } from "react-native";
import style from "./style";
import { getUserbyId, getUserFollowers } from "@/api";
const emailAddressRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: emailAddressRegex,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
};
export const profileInfo = {
  _id: "66d0f47386672a23fcce9616",
  id: 1,
  name: "Tom Pearson",
  profileImage:
    "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  backgroundImage:
    "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  address: "2614 Sweetwood Drive, Arvada, CO 80002",
  isSeller: "true",
};
export const URLS = {
  login: "/auth/login",
  signup: "/signup",
  followUser: (id) => `/users/${id}/follow`,
  unfollowUser: (id) => `/users/${id}/unfollow`,
  getUserbyId: (id) => `/users/${id}`,
  removeFollowerbyId: (id) => `/users/${id}/remove-follower`,
  getUserStories: (id) => `/users/${id}/stories`,
  likeVehicle: (id) => `/vehicles/${id}/like`,
  unlikeVehicle: (id) => `/vehicles/${id}/unlike`,
};
export const profileData = [
  {
    id: 1,
    name: "Your Story",
    image:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 2,
    name: "Jane Smith",
    image:
      "https://plus.unsplash.com/premium_photo-1681881436293-37ef335c9430?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Alice Joe",
    image:
      "https://images.unsplash.com/photo-1717278920189-f69e4697dcc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 4,
    name: "Bob Brown",
    image:
      "https://plus.unsplash.com/premium_photo-1680374923120-3daee1f2952a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 5,
    name: "Charlie Davis",
    image:
      "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 6,
    name: "Diana Evans",
    image:
      "https://images.unsplash.com/photo-1711279078759-a23cc73ec406?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcwfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  },
];
export const carData = [
  {
    id: 1,
    name: "Jane Smith",
    userId: "66d7202175350889900b1d3b",

    profileImage:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    isSeller: false,
    isFavorite: false,
    daysAgo: "2 days ago",
    cars: {
      carImage: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/514438033/photo/hot-rod-heart.webp?s=170667a&w=0&k=20&c=2h0ZejiXa89xK37vCK4zl15N6hlv3x38PDzWNfEMaAU=",
        "https://images.unsplash.com/photo-1441148345475-03a2e82f9719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1605245807255-efe3e8662d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVudGxleXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1441148345475-03a2e82f9719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      carName: "Ford Mustang",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, suscipit illo quos libero, blanditiis dignissimos laudantium quia accusantium possimus ",
      location: "2614 Sweetwood Drive, Arvada, CO 80002",
      price: "$250",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    userId: "66d7202175350889900b1d3b",

    isSeller: false,
    isFavorite: false,
    daysAgo: "2 days ago",
    profileImage:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
    cars: {
      carImage: [
        "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        "https://plus.unsplash.com/premium_photo-1698183570742-02b8b5fd31a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw3UnktUm1YN1JsQXx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1586733564032-3db923113ff0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1588899428678-f9ea565d91fc?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1467489904517-075c242c2b4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      ],
      carName: "Ford Mustang",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, suscipit illo quos libero, blanditiis dignissimos laudantium quia accusantium possimus ",
      location: "Dallas, TX",
      price: "$250",
    },
  },
  {
    id: 3,
    name: "Jane Smith",
    userId: "66d7202175350889900b1d3b",

    isSeller: false,
    isFavorite: false,
    daysAgo: "2 days ago",
    profileImage:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",

    cars: {
      carImage: [
        "https://images.unsplash.com/photo-1564497631167-ffc10306af7b?q=80&w=1382&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/1193956106/photo/indian-man-drives-auto-rickshaw-india.webp?b=1&s=170667a&w=0&k=20&c=n5JLTfjn5bdaCgHvUwoav-AlJa-A6DAuX6-hwRXmDoI=",
        "https://images.unsplash.com/photo-1514715702578-09cae826e8e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGF1dG8lMjByaWNrc2hhd3xlbnwwfHwwfHx8MA%3D%3D",
        "https://media.istockphoto.com/id/1140956329/photo/traditional-indian-moto-rickshaw-taxi-on-one.webp?b=1&s=170667a&w=0&k=20&c=ZtISeHn87WyPidCEErH9walfw1UaIcQa_ehY5HbmHbI=",
        "https://media.istockphoto.com/id/539107092/photo/auto-rickshaw-stand-in-tamil-nadu.webp?b=1&s=170667a&w=0&k=20&c=2DgQSx6HfJeEsTV9cbFblzXga7oG0PiTnLulJQ3xxqU=",
        "https://plus.unsplash.com/premium_photo-1698183570742-02b8b5fd31a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw3UnktUm1YN1JsQXx8ZW58MHx8fHx8",
      ],
      carName: "Auto Rikshaw",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, suscipit illo quos libero, blanditiis dignissimos laudantium quia accusantium possimus ",
      location: "Dallas, TX",
      price: "$280",
    },
  },
  {
    id: 4,
    name: "Jane Smith",
    userId: "66d7202175350889900b1d3b",

    isSeller: false,
    isFavorite: false,
    daysAgo: "2 days ago",
    profileImage:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",

    cars: {
      carImage: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/514438033/photo/hot-rod-heart.webp?s=170667a&w=0&k=20&c=2h0ZejiXa89xK37vCK4zl15N6hlv3x38PDzWNfEMaAU=",
        "https://images.unsplash.com/photo-1441148345475-03a2e82f9719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVudGxleXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1605245807255-efe3e8662d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVudGxleXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      carName: "Ford Mustang",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, suscipit illo quos libero, blanditiis dignissimos laudantium quia accusantium possimus ",
      location: "Dallas, TX",
      price: "$250",
    },
  },
  {
    id: 5,
    name: "Jane Smith",
    userId: "66d7202175350889900b1d3b",

    isSeller: false,
    isFavorite: false,
    daysAgo: "2 days ago",
    profileImage:
      "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",

    cars: {
      carImage: [
        "https://images.unsplash.com/photo-1564497631167-ffc10306af7b?q=80&w=1382&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/1193956106/photo/indian-man-drives-auto-rickshaw-india.webp?b=1&s=170667a&w=0&k=20&c=n5JLTfjn5bdaCgHvUwoav-AlJa-A6DAuX6-hwRXmDoI=",
        "https://images.unsplash.com/photo-1514715702578-09cae826e8e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGF1dG8lMjByaWNrc2hhd3xlbnwwfHwwfHx8MA%3D%3D",
        "https://media.istockphoto.com/id/1140956329/photo/traditional-indian-moto-rickshaw-taxi-on-one.webp?b=1&s=170667a&w=0&k=20&c=ZtISeHn87WyPidCEErH9walfw1UaIcQa_ehY5HbmHbI=",
        "https://media.istockphoto.com/id/539107092/photo/auto-rickshaw-stand-in-tamil-nadu.webp?b=1&s=170667a&w=0&k=20&c=2DgQSx6HfJeEsTV9cbFblzXga7oG0PiTnLulJQ3xxqU=",
      ],
      carName: "Auto Rikshaw",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, suscipit illo quos libero, blanditiis dignissimos laudantium quia accusantium possimus ",
      location: "Dallas, TX",
      price: "$280",
    },
  },
];
export const categories = [
  {
    id: 1,
    name: "Cars",
    image: assets.cars,
  },
  {
    id: 2,
    name: "Bikes",
    image: assets.bike,
  },
  {
    id: 3,
    name: "Trucks",
    image: assets.truck,
  },
  {
    id: 4,
    name: "Vans",
    image: assets.van,
  },
];

export const carListingData = [
  {
    id: 1,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    sellerType: "Trade Seller",
    image: assets.bmw,
    avatarImg: assets.profileImg,
    pricePerMonth: "320/mo",
    isFavorite: false,
  },
  {
    id: 2,
    name: "John Clarke",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "Lamborghini Hurricane",
    location: "Belfast",
    sellerType: "Private seller",
    image: assets.lamborghini,
    avatarImg: assets.profileImg1,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    sellerType: "Trade Seller",
    image: assets.bmw,
    avatarImg: assets.profileImg,
    pricePerMonth: "320/mo",
    isFavorite: true,
  },
  {
    id: 4,
    name: "John Clarke",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "Lamborghini Hurricane",
    location: "Belfast",
    sellerType: "Private seller",
    image: assets.lamborghini,
    avatarImg: assets.profileImg1,
    isFavorite: true,
  },
];

export const bodyTypes = [
  "Any",
  "Convertible",
  "Coupe",
  "Saloon",
  "Hatchback",
  "Estate",
  "MPV",
  "SUV",
  "Van",
  "Pick Up",
];
export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;
export const carInfo = [
  {
    id: 1,
    value: "2024",

    image: assets.calender,
  },
  {
    id: 2,

    value: "80,000",

    image: assets.carMeter,
  },
  {
    id: 3,

    value: "Petrol",

    image: assets.fuel,
  },
  {
    id: 4,

    value: "Automatic",
    image: assets.carType,
  },
];
export const vehicleOverview = [
  {
    id: 1,
    make: "BMW",
    trim: "",
    year: "2016",
    fuelType: "Diesel",
    bodyType: "Saloon",
    doors: "4",
    model: "7-Series",
    trimLevel: "",
    mileage: "80,000 mi",
    transmission: "Automatic",
    seats: "5",
    color: "White",
  },
];

export const followersData = [
  { id: 1, name: "Patricia Sanders", avatar: assets.followerAvatar },
  { id: 2, name: "Jane Smith", avatar: assets.followerAvatar },
  { id: 3, name: "Alice Joe", avatar: assets.followerAvatar },
  { id: 4, name: "Bob Brown", avatar: assets.followerAvatar },
  { id: 5, name: "Charlie Davis", avatar: assets.followerAvatar },
  { id: 6, name: "Diana Evans", avatar: assets.followerAvatar },
];

export const followingData = [
  {
    id: 1,
    name: "Chris Sanders",
    avatar: assets.followerAvatar,
    isFollowing: true,
  },
  {
    id: 2,
    name: "Chris Sanders",
    avatar: assets.followerAvatar,
    isFollowing: true,
  },
  {
    id: 3,
    name: "Chris Sanders",
    avatar: assets.followerAvatar,
    isFollowing: true,
  },
];
export const messages = [
  {
    id: 1,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: ["hellloooooo", "jagsdjaskjdk", "jadshaskdhakshd"],
  },
  {
    id: 2,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
    ],
  },
  {
    id: 3,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hello",
    ],
  },
  {
    id: 4,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
  {
    id: 5,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
  {
    id: 6,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
  {
    id: 7,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
  {
    id: 8,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
  {
    id: 9,
    name: "Eddie Lake",
    time: "30m ago",
    profileImage: assets.profileImage,
    carImage: assets.carImage,
    messages: [
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam mollitia, assumenda, doloremque incidunt ullam, reiciendis animi quis veritatis fugit vel expedita necessitatibus dignissimos aliquid obcaecati cupiditate nihil! Ut, a?",
      "hellloooooo",
      "jagsdjaskjdk",
      "jadshaskdhakshd",
      "dksnkanndandadnadnal",
    ],
  },
];
export const adsData = [
  {
    id: 1,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Active",
    image: assets.bmw,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
  {
    id: 3,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Active",
    image: assets.bmw,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
  {
    id: 5,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
  {
    id: 6,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
  {
    id: 7,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
  {
    id: 8,
    name: "Megan Duffy",
    daysAgo: "2 days ago",
    price: "€4500",
    car: "BMW m4 2018",
    location: "Dublin",
    status: "Sold",
    image: assets.lamborghini,

    isFavorite: false,
  },
];

export const carDetails = [
  {
    section: "Vehicle Overview",
    key: "overview",
    details: [
      { label: "Make", value: "Audi", name: "make" },
      { label: "Model", value: "A6", name: "model" },
      { label: "Trim", value: "S Line", name: "" },
      { label: "Trim Level", value: "Sports Trim", name: "" },
      { label: "Year", value: "2014", name: "" },
      { label: "Mileage", value: "147,200 mi", name: "" },
      { label: "Fuel Type", value: "Diesel", name: "fuel" },
      { label: "Transmission", value: "Automatic", name: "transmission" },
      { label: "Body Type", value: "Saloon", name: "body" },
      { label: "Seats", value: "5", name: "" },
      { label: "Doors", value: "4", name: "doors" },
      { label: "Colour", value: "Grey", name: "colour" },
    ],
  },
  {
    section: "Ownership & History",
    key: "history",
    details: [
      { label: "Current Country of Reg.", value: "Ireland", name: "" },
      { label: "Imported", value: "Unknown country", name: "" },
      { label: "Total Owners", value: "3", name: "no_of_owners" },
      { label: "NCT Expiry", value: "Sep 2025", name: "NCT_expiry_date" },
    ],
  },
  {
    section: "Running Costs",
    key: "costs",
    details: [
      { label: "Road Tax", value: "200", name: "tax_class" },
      { label: "Comb. Fuel Consumption", value: "4.4 L/100 km", name: "" },
      { label: "Rural Fuel Consumption", value: "3.9 L/100 km", name: "" },
      { label: "Urban Fuel Consumption", value: "5.2 L/100 km", name: "" },
    ],
  },
  {
    section: "Performance",
    key: "performance",
    details: [
      { label: "Engine Size", value: "2.0 L", name: "engine_cc" },
      { label: "Co2 Emissions", value: "120", name: "co2_emissions" },
      { label: "Power", value: "190 hp", name: "" },
      { label: "Acceleration (0-100 km/h)", value: "8.4 sec", name: "" },
      { label: "Top Speed", value: "232 km/h", name: "" },
      { label: "Torque", value: "400 Nm", name: "" },
    ],
  },
  {
    section: "Safety",
    key: "safety",
    details: [
      { label: "Euro NCAP Overall Safety Rating", value: "5/5", name: "" },
      { label: "Adult Protection Rating", value: "91%", name: "" },
      { label: "Child Protection Rating", value: "83%", name: "" },
      { label: "Pedestrian Protection Rating", value: "41%", name: "" },
      { label: "Safety Assistance Rating", value: "86%", name: "" },
    ],
  },
  {
    section: "Dimensions",
    key: "dimensions",
    details: [
      { label: "External Length", value: "4.93 m", name: "" },
      { label: "External Width", value: "1.87 m", name: "" },
      { label: "External Height", value: "1.46 m", name: "" },
      { label: "Boot Volume", value: "530 L", name: "" },
      { label: "Fuel Tank Capacity", value: "73 L", name: "" },
    ],
  },
];
export const keyExtractor = (item) => item?.id?.toString();
export const menuItems = [
  { title: "Dark Mode", icon: assets.darkMode, isSwitch: true },
  { title: "Privacy Policy", icon: assets.privacyIcon },
  { title: "Terms and Conditions", icon: assets.privacyIcon },
  { title: "Logout", icon: assets.logOut },
];

export const shadow = {
  shadowColor: style.blackBackground.backgroundColor,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
};
export const buttonShadow = {
  shadowColor: style.blackBackground.backgroundColor,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 8,
};
export const textShadow = {
  textShadowColor: style.shadowGray.shadowColor,
  textShadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  textShadowRadius: 1,
  elevation: 1,
};
export const profilePicturePlaceholder =
  "https://images.unsplash.com/photo-1596654302378-d0403c36d1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D";
