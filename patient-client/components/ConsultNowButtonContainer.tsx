import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const ConsultNowButtonContainer = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: props.disabled
            ? "#ccc"
            : pressed
            ? "#aa0000"
            : props.color || "green",
        },
        styles.container,
        props.buttonStyles,
      ]}
      disabled={props.disabled}
      onPress={props.onPress}
      accessible
      accessibilityLabel={props.accessibilityLabel || "A Button"}
    >
      <Text style={[styles.text, props.textStyles]}>
        {props.children || "Consult Now"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  text: { color: "white" },
});

export default ConsultNowButtonContainer;
