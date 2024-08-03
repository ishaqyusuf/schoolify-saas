import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icons } from "~/components/Icons";

export default function Goals() {
  const [hasGoal, setHasGoal] = useState(true);

  return (
    <View className="p-4">
      {hasGoal ? (
        <View className="">
          <View className="flex flex-row justify-between">
            <Text className="font-semibold">Goals 1.567/2.00 USD</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "red" : "white",
                },
                styles.wrapperCustom,
              ]}
              onPress={() => setHasGoal(false)}
              className="mx-1 flex-row items-center gap-2"
            >
              <Icons.Pencil size={12} color={"blue"} />
              <Text className="font-bold text-blue-600">Edit</Text>
              {/* {({ pressed }) => (
                <Text style={styles.text}>
                  {pressed ? "Pressed!" : "Press Me"}
                </Text>
              )} */}
            </Pressable>
          </View>
          <View className="mt-4">
            <View className="relative h-1.5 overflow-hidden rounded-full bg-slate-300">
              <View className="absolute h-full w-[70%] bg-green-600" />
            </View>
          </View>
        </View>
      ) : (
        <View className="flex flex-row justify-center">
          <Text className="text-sm text-slate-500">
            You haven't set any goals for this balance.
          </Text>
          <Pressable onPress={() => setHasGoal(true)} className="mx-1">
            <Text className="font-bold text-blue-600">Set Goals</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
