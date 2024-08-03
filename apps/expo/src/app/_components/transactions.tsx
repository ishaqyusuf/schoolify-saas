import { Pressable, Text, TextInput, View } from "react-native";

import { Icons } from "~/components/Icons";
import { fetchTransactionData } from "./transactions.data";

export default function Transactions() {
  const tx = fetchTransactionData();

  return (
    <View className="flex-1 flex-col gap-4 rounded-t-3xl bg-white p-4 pt-6">
      <View>
        <Text className="text-2xl font-bold">Transactions</Text>
      </View>
      <View className="flex-row gap-2">
        <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-slate-300">
          <View className="pl-2">
            <Icons.Search size={24} color={"gray"} />
          </View>
          <TextInput placeholder="Search" className="h-10 flex-1" />
        </View>
        <Pressable className="flex-row items-center gap-2 rounded-lg border border-slate-300 px-3 drop-shadow-lg">
          <Icons.Filter color={"gray"} size={12} />
          <Text className="text-slate-500">Filter</Text>
        </Pressable>
      </View>
      {/* <Text>{tx[0]?.tx.length}</Text> */}
      {tx.map((t, i) => (
        <View className="grid gap-2" key={i}>
          <View>
            <Text className="font-bold text-slate-400">{t.header}</Text>
          </View>
          {t.tx.map((item, _) => (
            <View key={`${_}-item`} className="flex-row gap-2">
              <View
                className={`h-12 w-12 flex-row items-center justify-center rounded-full ${item.debit ? "bg-red-200" : "bg-green-200"}`}
              >
                <item.Icon size={20} color={"black"} />
              </View>
              <View className="flex flex-1 flex-col">
                <View className="flex-1 flex-row gap-2">
                  <View className="flex-1">
                    <Text className="text-slate-500">{item.headline}</Text>
                    <Text className="">{item.name}</Text>
                  </View>
                  <View className="">
                    <Text>
                      {item.debit ? "-" : "+"}
                      {item.amount}
                    </Text>
                  </View>
                </View>
                <View className="">
                  <View className="border-b border-slate-300" />
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
