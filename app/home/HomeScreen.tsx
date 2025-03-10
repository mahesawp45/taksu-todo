import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'constants/Colors';
import useTodoStore from 'hooks/useTodoStore';
import useUserStore from 'hooks/useUserStore';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import Todo from 'types/todo';

import TaskItem from './components/TaskItem';
import TodoModal from './components/TodoModal';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { todos, deleteTodo } = useTodoStore();

  const { user } = useUserStore();

  useEffect(() => {
    useTodoStore.getState().loadTodos();
  }, []);

  const handleDelete = (todo: Todo) => {
    deleteTodo(todo.id);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View className="flex-1 p-5">
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-white">Hi, {user}</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem item={item} onDelete={() => handleDelete(item)} />}
      />

      <Pressable
        onPress={handleOpenModal}
        className="absolute bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
        <FontAwesome name="plus" size={32} color={Colors.primary.background} />
      </Pressable>

      {/* Modal Add */}
      <TodoModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={user} />
    </View>
  );
};

export default HomeScreen;
