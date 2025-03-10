import { CommonActions, useNavigation } from '@react-navigation/native';
import Button from 'app/components/button/Button';
import InputText from 'app/components/input/InputText';
import { RootStackParamList } from 'app/navigation/routes/routes';
import { Colors } from 'constants/Colors';
import Strings from 'constants/Strings';
import { Formik } from 'formik';
import useUserStore from 'hooks/useUserStore';
import { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

import loginValidationSchema from './validation/login_validation';

interface FormData {
  user: string;
}

export const LoginScreen = () => {
  const [request, setRequest] = useState<FormData>({ user: '' });
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const login = useUserStore((state) => state.login);

  const handleLogin = (user: FormData) => {
    try {
      login({ user: user.user, isLoggedin: true });
      ToastAndroid.show(`Login Successfully!`, ToastAndroid.SHORT);

      const replaceAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.dispatch(replaceAction);
    } catch (error) {
      ToastAndroid.show(`Error Login ${error}`, ToastAndroid.SHORT);
      console.log('====================================');
      console.log('Error Login --> ', error);
      console.log('====================================');
    }
  };

  return (
    <Formik initialValues={request} onSubmit={handleLogin} validationSchema={loginValidationSchema}>
      {({ errors, handleChange, handleSubmit, values }) => (
        <>
          <View className="flex-1 items-center justify-center p-16">
            <InputText
              className="mb-8"
              id="name"
              value={values.user}
              onChange={handleChange('user') as any}
              label={Strings.auth.nameLabel}
              placeholder={Strings.auth.namePlaceHolder}
              error={errors.user ?? undefined}
            />
            <View className="flex  flex-col justify-start self-start">
              <Button
                label="Next"
                icon="arrow-forward"
                onPress={() => handleSubmit()}
                color={Colors.button.success}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};
