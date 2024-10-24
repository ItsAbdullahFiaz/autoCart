import AppButton from "@/components/button/Button";
import Header from "@/components/header/header";
import { CarScanDetail } from "@/models/types.home";
import { buttonShadow, carDetails } from "@/utils";
import style from "@/utils/style";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ScanDetail: React.FC = (props) => {

  const [data, setData] = useState(null)
  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    Array.from({ length: carDetails.length }, () => true),
  );

  const getCarDetails = async (carId: any) => {

    axios.post('http://192.168.1.12:8080/auth/login', {
      email: 'test@example.com',
      password: 'test@123'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        global.sessionToken = response.data.user.authentication.sessionToken
        axios.get(`http://192.168.1.12:8080/car/${carId}/details`, {
          headers: {
            'Cookie': `AUTOCART-AUTH=${response.data.user.authentication.sessionToken}`
          }
        })
          .then(response => {
            console.log('Response:', response.data.data);
            setData(response.data.data)
            Alert.alert(`Record fetched successfully`)
          })
          .catch(error => {
            Alert.alert(`Unable to fetch detail of ${carId}`)
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getCarDetails("MD24ZPZ");
  }, [])

  const toggleSection = (index: number) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const carDetailItem: ListRenderItem<CarScanDetail> = ({ item, index }) => {
    const isExpanded = expandedSections[index];
    return (
      <View className="mb-4">
        <View className="flex-row items-center justify-between px-2 mb-3 ">
          <Text className="text-black font-gilroySemibold text-sm ">
            {item?.section}
          </Text>
          <TouchableOpacity
            onPress={() => toggleSection(index)}
            className="p-1"
          >
            <Icon
              name={isExpanded ? "chevron-up-sharp" : "chevron-down-sharp"}
              size={15}
            />
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <View className="flex-row flex-wrap justify-between">
            {item?.details?.map((detail) => {
              return (
                <View
                  key={detail.label + 1}
                  className="w-1/2 flex flex-row justify-between px-2 my-1.5 rounded-md py-1"
                >
                  <Text className="text-grey font-gilroyMedium flex-1">
                    {detail.label}
                  </Text>
                  <Text className="font-gilroyMedium text-right flex-1 ">
                    {data?.[detail.name] || "-"}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        {index < carDetails.length - 1 && (
          <View style={styles.divider} className="mx-2 mt-3" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="bg-white w-[100%] pt-2">
        <Header />
      </View>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 items-center">
          <Text className="montserratbuttonTextStyle text-black my-4">
            Thank you for using our car scanner
          </Text>
          <Text className="font-montserratSemiBold text-xl text-black my-2">
            View Car details below
          </Text>
          <Text className="font-montserratSemiBold text-xl text-black my-2">
            Registration Number: MD24ZPZ
          </Text>
          <View className="w-[95%] bg-white m-1 py-2.5 px-1.5 rounded-lg shadow-lg pt-4">
            <FlatList
              data={carDetails}
              renderItem={carDetailItem}
              keyExtractor={(index) => index?.toString()}
            />
          </View>
          <Text className="montserratbuttonTextStyle text-black my-2">
            Do you wish to place your Ad quicker ?
          </Text>
          <View className="flex-row justify-evenly w-[80%] self-center my-5">
            <AppButton
              buttonStyle="bg-green rounded-md py-2 px-3 "
              title="Place Ad"
              textStyle="text-white font-montserratBold text-xs"
              style={[buttonShadow, { shadowRadius: 2, elevation: 3 }]}
              onPress={() => {
                global.isManualAd = false
                global.data = data
                router.replace({
                  pathname: "(app)/createAd",
                });
              }}
            />
            <AppButton
              buttonStyle="bg-mustard rounded-md py-2 px-3 "
              title="Scan again"
              textStyle="text-white font-montserratBold text-xs"
              style={[buttonShadow, { shadowRadius: 2, elevation: 3 }]}
              onPress={() => {
                router.replace({
                  pathname: "(tab)/scan",
                });
              }}
            />
            <AppButton
              buttonStyle="bg-darkRed rounded-md py-2 px-3 "
              title="Cancel"
              textStyle="text-white font-montserratBold text-xs"
              style={[buttonShadow, { shadowRadius: 2, elevation: 3 }]}
              onPress={() => {
                router.replace({
                  pathname: "(drawer)/(tab)/home",
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanDetail;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: style.blackBackground.backgroundColor,
    borderBottomWidth: 1,
  },
});
