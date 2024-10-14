import { StyleSheet, Text, View, TextInput } from "react-native";
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  return (
    <View style={styles.view}>
        <TextInput placeholder="search"/>
    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

