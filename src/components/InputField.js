import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  touched,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          touched && error ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={'black'}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
