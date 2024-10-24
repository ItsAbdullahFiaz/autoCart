import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import EmailIcon from "react-native-vector-icons/Fontisto";
import AppTextInput from "@/components/textinput/TextInput";
import AppButton from "@/components/button/Button";
import { validationRules } from "@/utils";

const ForgetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmitEmail: SubmitHandler<FieldValues> = async (formData) => {
    const { email } = formData;
    try {
      setLoading(true);
      reset();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-600">
      <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
        <View className="w-full items-center mt-20">
          <Text className="text-3xl text-center text-black dark:text-white">
            Forgot Password
          </Text>
        </View>

        <FormProvider {...methods}>
          <View className="mt-16 mx-5 w-full items-center">
            <AppTextInput
              name="email"
              control={control}
              maxLength={30}
              placeholder="Enter your email"
              placeholderTextColor={"black"}
              autoCapitalize="none"
              keyboardType="email-address"
              rules={validationRules.email}
              error={errors.email?.message?.toString()}
              leftIcon={<EmailIcon name={"email"} size={20} />}
            />
            <View className="w-full items-center">
              <AppButton
                title="Submit"
                buttonStyle="w-[90%] my-2 rounded-lg h-10 self-center dark:bg-gray-800"
                textStyle="text-sm font-bold text-white"
                onPress={handleSubmit(onSubmitEmail)}
                loading={loading}
              />
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
