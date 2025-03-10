import { MaterialIcons } from '@expo/vector-icons';
import Button from 'app/components/button/Button';
import { Colors } from 'constants/Colors';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Todo from 'types/todo';
import { formatDate } from 'utils';

interface ITaskItem {
  item: Todo;
  onDelete: () => void;
}

const TaskItem = ({ item, onDelete }: ITaskItem) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-gray-300 text-gray-700';
      case 'done':
        return 'bg-green-500 text-white';
      case 'overdue':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <View
      className="mb-4 rounded-lg px-8 py-4"
      style={{ backgroundColor: Colors.primary.card, borderRadius: 20 }}>
      <View className="flex flex-row items-center justify-between">
        <Text className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(item.status)}`}>
          {item.status.toUpperCase()}
        </Text>
        <Pressable className="rounded-lg bg-gray-800 p-1" onPress={onDelete}>
          <MaterialIcons name="delete" size={20} color="gray" />
        </Pressable>
      </View>

      <Text
        className="mb-4 mt-2 text-2xl font-bold text-white"
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text className="text-gray-400">Due date:</Text>
      <Text className="text-gray-300">{`${formatDate(item.dueDate)}`}</Text>

      {item.status !== 'done' && (
        <Button
          label="Done"
          color={Colors.button.primary}
          className="self-end"
          onPress={() => {}}
        />
      )}
    </View>
  );
};

export default TaskItem;
