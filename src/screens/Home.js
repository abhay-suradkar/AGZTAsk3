import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (route.params?.newTask) {
      const { task, index } = route.params.newTask;

      setTasks((prevTasks) => {
        // If index is undefined, add new task
        if (index === undefined) {
          return [...prevTasks, task];
        } else {
          // Edit existing task
          const updatedTasks = [...prevTasks];
          updatedTasks[index] = task;
          return updatedTasks;
        }
      });

      // Clear the param so effect doesn't run again unnecessarily
      navigation.setParams({ newTask: undefined });
    }
  }, [route.params?.newTask]);

  const handleDeleteTask = (index) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  const handleEditTask = (task, index) => {
    navigation.navigate('CreateTask', { taskToEdit: task, taskIndex: index });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Task summary */}
      <View style={styles.taskSummary}>
        <Text style={styles.summaryText}>
          Pending: {tasks.filter(task => !task.completed).length}
        </Text>
        <Text style={styles.summaryText}>
          Completed: {tasks.filter(task => task.completed).length}
        </Text>
      </View>

      {/* Task List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tasks.length === 0 ? (
          <Text style={styles.noTaskText}>No tasks yet. Create one!</Text>
        ) : (
          tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={styles.taskMeta}>
                  Priority: {task.priority} | Due: {task.dueDate}
                </Text>
                <Text style={styles.taskMeta}>
                  Status: {task.completed ? 'Completed' : 'Pending'}
                </Text>
              </View>

              <View style={styles.taskButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => handleEditTask(task, index)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDeleteTask(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Create Task Button */}
        <TouchableOpacity
          style={styles.createTaskButton}
          onPress={() => navigation.navigate('CreateTask')}
        >
          <Text style={styles.createTaskButtonText}>Create Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    height: 80,
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: { fontSize: 24, fontWeight: 'bold', color: 'white' },

  taskSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e8f0fe',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  scrollContent: { padding: 20 },
  noTaskText: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 50 },

  taskItem: {
    backgroundColor: '#f1f3f6',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  taskInfo: { marginBottom: 10 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#2e86de' },
  taskDescription: { fontSize: 14, color: '#555', marginVertical: 5 },
  taskMeta: { fontSize: 12, color: '#888' },

  taskButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  editButton: { backgroundColor: '#f0ad4e' },
  deleteButton: { backgroundColor: '#d9534f' },
  buttonText: { color: 'white', fontWeight: 'bold' },

  createTaskButton: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createTaskButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
