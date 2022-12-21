import { StatusBar } from "expo-status-bar";
import {
  useEffect,
  useLayoutEffect,
  useState,
  Component,
  useRef,
  createRef,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Keyboard,
  TextInput,
} from "react-native";
import JsonFun from "./sources/JsonFun";

export default function App() {
  return <JsonFun />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
