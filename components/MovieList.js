import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/Moviedb";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg" style={styles.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {data.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className={`space-y-2 mt-4 ${index === 0 ? "" : "ml-2"}`}>
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/images/moviePoster2.png")}
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1 text-center">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      ) : (
        <Text className="font-bold text-white text-xl text-center">
          Nothing was found
        </Text>
      )}
    </View>
  );
};

export default MovieList;
