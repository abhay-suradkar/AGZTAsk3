import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateTask = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // If editing, get task data and index from route params
  const taskToEdit = route.params?.taskToEdit;
  const taskIndex = route.params?.taskIndex;

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Low');
  const [dueDate, setDueDate] = useState(taskToEdit ? new Date(taskToEdit.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      dueDate: dueDate.toDateString(),
    };

    // Pass task and index back to Home screen
    navigation.navigate('Home', {
      newTask: {
        task: newTask,
        index: taskIndex,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor="black"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor="black"
        multiline
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          itemStyle={{ color: 'black', backgroundColor: 'white' }}
        >
          <Picker.Item label="Low" value="Low" color="black" />
          <Picker.Item label="Medium" value="Medium" color="black" />
          <Picker.Item label="High" value="High" color="black" />
        </Picker>
        <Icon
          name="arrow-drop-down"
          size={24}
          color="black"
          style={styles.iconStyle}
        />
      </View>

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Button title={taskToEdit ? "Update Task" : "Add Task"} onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    color: 'black',
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#aaa',
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  picker: {
    color: 'black',
    paddingRight: 30,
  },
  iconStyle: {
    position: 'absolute',
    right: 10,
    top: '35%',
    pointerEvents: 'none',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f1f3f6',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CreateTask;
