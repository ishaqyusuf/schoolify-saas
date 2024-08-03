import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Icons } from "~/components/Icons";
import Goals from "./_components/goals";
import Transactions from "./_components/transactions";

export default function Index() {
  const actions = [
    { Icon: Icons.ArrowUp, title: "Send" },
    { Icon: Icons.ArrowDown, title: "Request" },
    { Icon: Icons.RefreshCcw, title: "Convert" },
    { Icon: Icons.MoreHorizontal, title: "More" },
  ];
  return (
    <SafeAreaView className=" flex-col gap-4 bg-slate-100 ">
      <ScrollView className="mb-16 min-h-screen py-4">
        <View className="flex flex-row items-center gap-2 px-4">
          <Pressable className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200">
            <Icons.ChevronLeft className="" color="black" size={16} />
          </Pressable>
          <View>
            <Text>Overview</Text>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center gap-2 py-2">
          <Icons.Flag size={32} color="red" />
          <Text className="text-3xl font-bold">1.567 USD</Text>
          <Text className="text-sm">
            <Text className="font-semibold">1 USD = 15,326.35 IDR,</Text>{" "}
            <Text className="text-slate-700">As of today</Text>
          </Text>
        </View>
        <View className="flex flex-row justify-between px-8">
          {actions.map((action) => (
            <View
              key={action.title}
              className="flex flex-col items-center justify-center gap-2"
            >
              <View className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                <action.Icon size={24} color={"white"} />
              </View>
              <Text className="font-medium tracking-wider">{action.title}</Text>
            </View>
          ))}
        </View>
        <Goals />
        <Transactions />
      </ScrollView>
    </SafeAreaView>
  );
}
