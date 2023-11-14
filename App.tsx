import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';




interface JournalEntry {
  id: string;
  title: string;
  timestamp: string;
}

interface Task {
  id: string;
  content: string;
}

const App = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {id: '1', title: 'Reflection on Gratitude', timestamp: '2023-11-13'},
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  const addTask = () => {
    if (newTaskContent.trim().length === 0) {
      return;
    }

    setTasks([...tasks, {id: Date.now().toString(), content: newTaskContent}]);
    setNewTaskContent('');
    setModalVisible(false);
  };

  const renderTask = ({item}: {item: Task}) => (
    <View className={'py-2.5 border-b border-gray-200'}>
      <Text className={'text-base text-gray-800'}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView className={'flex-1 bg-gray-100 p-5'}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(!isModalVisible)}>
        <View className={'m-5 bg-white rounded-lg p-9 shadow-lg'}>
          <TextInput
            className={'h-10 mb-4 border-b border-gray-300 px-2 w-50'}
            placeholder="Enter task..."
            value={newTaskContent}
            onChangeText={setNewTaskContent}
          />
          <Button title="Add Task" onPress={addTask} />
        </View>
      </Modal>

      <Text className={'text-xl font-bold text-gray-800'}>Journaling</Text>
      <TouchableOpacity
        className={'bg-gray-200 py-4 rounded-lg mb-5'}
        onPress={() => setModalVisible(true)}>
        <Text className={'text-lg text-gray-800'}>+ Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default App;
