import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Home = () => {
  const pendingTasks = [
    { id: 1, task: "Complete Inventory Update", dueDate: "2025-05-07" },
    { id: 2, task: "Finish Staff Training", dueDate: "2025-05-08" },
    { id: 3, task: "Approve Leave Requests", dueDate: "2025-05-10" },
    { id: 4, task: "Prepare Monthly Reports", dueDate: "2025-05-12" },
    { id: 5, task: "Conduct Team Meeting", dueDate: "2025-05-14" },
  ];

  const updateTasks = [
    { id: 1, task: "Update Inventory", status: "In Progress" },
    { id: 2, task: "Fix Bug in Mobile App", status: "Completed" },
    { id: 3, task: "Add New Staff Member", status: "Not Started" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
      </View>

      <ScrollView>
      <View style={styles.taskCountsContainer}>
        <View style={styles.taskCount}>
          <Text style={styles.taskLabel}>Pending Tasks</Text>
          <Text style={styles.taskCountText}>{pendingTasks.length}</Text>
        </View>
        <View style={styles.taskCount}>
          <Text style={styles.taskLabel}>Update Tasks</Text>
          <Text style={styles.taskCountText}>{updateTasks.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pending Tasks</Text>
          {pendingTasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.task}</Text>
              <Text style={styles.dueDateText}>Due Date: {task.dueDate}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Update Tasks</Text>
          {updateTasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskText}>{task.task}</Text>
              <Text style={styles.statusText}>Status: {task.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 80,
    backgroundColor: "#2e86de",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  taskCountsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eaf2f8", // Soft background color for the task section
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 10, // Rounded corners
    marginHorizontal: 20, // Add margin to the sides
    borderWidth: 1, // Border around the task section
    borderColor: "#d3d3d3", // Light border color
    shadowColor: "#000", // Shadow for 3D effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Elevation for Android
  },
  taskCount: {
    alignItems: "center",
  },
  taskLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskCountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e86de",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  taskItem: {
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dueDateText: {
    fontSize: 14,
    color: "#555",
  },
  statusText: {
    fontSize: 14,
    color: "#888",
  },
});
