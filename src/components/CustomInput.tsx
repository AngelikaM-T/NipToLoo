import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const CustomInput = ({ control, name, rules = {}, placeholder }) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[styles.container, { borderColor: error ? "red" : "white" }]}
          >
            <TextInput
              label={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={name.includes("password") && secureTextEntry ? (true) : (false)}
              style={[styles.input, {}]}
              right={
                name.includes("password") ? (
                  <TextInput.Icon
                    icon={secureTextEntry ? "eye-off" : "eye"}
                    iconColor={styles.passwordIcon.color}
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                ) : null
              }
            ></TextInput>
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {},
  passwordIcon: {
    color: "#005691",
  },
});

export default CustomInput;
