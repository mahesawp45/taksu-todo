import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Button from 'app/components/button/Button';
import InputText from 'app/components/input/InputText';
import { Colors } from 'constants/Colors';
import Strings from 'constants/Strings';
import { Formik } from 'formik';
import useTodoStore from 'hooks/useTodoStore';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';
import Todo from 'types/todo';
import { formatDate } from 'utils';

import todoValidationSchema from '../validation/todo_validation';

interface ITodoModal {
  user: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const TodoModal = ({ user, modalVisible, setModalVisible }: ITodoModal) => {
  const { t } = useTranslation('global');

  const formikRef = useRef(null);

  const { saveTodo } = useTodoStore();

  const [initialValues, setInitialValues] = useState<Todo>({
    user,
    id: `${new Date()}`,
    dueDate: new Date(),
    status: 'open',
    title: '',
  });

  const openDatePicker = async (
    dueDate: Date,
    setFieldValue: (field: string, value: any) => void,
    currentValues: Todo
  ) => {
    DateTimePickerAndroid.open({
      value: dueDate || new Date(),
      mode: 'date',
      display: 'calendar',
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          openTimePicker(selectedDate, setFieldValue, currentValues);
        }
      },
    });
  };

  const openTimePicker = (
    selectedDate: Date,
    setFieldValue: (field: string, value: any) => void,
    currentValues: Todo
  ) => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      mode: 'time',
      display: 'clock',
      is24Hour: false,
      onChange: (_, selectedTime) => {
        if (selectedTime) {
          const finalDate = new Date(selectedDate);
          finalDate.setHours(selectedTime.getHours());
          finalDate.setMinutes(selectedTime.getMinutes());

          setFieldValue('dueDate', finalDate);
        }
      },
    });
  };

  const handleSave = (values: Todo) => {
    saveTodo(values);
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 rounded-lg p-6" style={{ backgroundColor: Colors.primary.modal }}>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            enableReinitialize={false}
            onSubmit={handleSave}
            validationSchema={todoValidationSchema}>
            {({ errors, handleSubmit, values, setFieldValue }) => (
              <>
                <Text className="mb-8 text-xl font-bold text-white">{t(Strings.todo.newTodo)}</Text>
                <InputText
                  className="mb-8"
                  id="title"
                  value={values.title}
                  onChange={(text) => setFieldValue('title', text)}
                  label={Strings.todo.titleLabel}
                  placeholder={Strings.todo.titlePlaceholder}
                  error={errors.title ?? undefined}
                />

                <Pressable onPress={() => openDatePicker(values.dueDate, setFieldValue, values)}>
                  <View>
                    <InputText
                      label={Strings.todo.dueDateLabel}
                      className="mb-8"
                      id="dueDate"
                      enable={false}
                      value={formatDate(values.dueDate)}
                    />
                    {errors.dueDate != null ? (
                      <Text className="mt-2 text-xs text-red-500">{`${errors.dueDate}`}</Text>
                    ) : null}
                  </View>
                </Pressable>

                <View className="mb-6 mt-4 flex w-1/2 items-center justify-center self-center">
                  <Button
                    label="Save"
                    color={Colors.button.primary}
                    className="w-full"
                    onPress={() => handleSubmit()}
                  />
                  <Pressable
                    className="mt-3 w-full items-center"
                    onPress={() => setModalVisible(false)}>
                    <Text className="text-gray-300">Cancel</Text>
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default TodoModal;
