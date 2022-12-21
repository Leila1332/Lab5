import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SectionList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const searchIcon = require("../assets/search.png");
const closeIcon = require("../assets/close.png");
const confirmIcon = require("../assets/confirm.png");

const Logo = () => (
  <View style={{ flexDirection: "column" }}>
    <Text></Text>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 40,
        color: "purple",
        backgroundColor: "grey",
      }}
    >
      YouTube
    </Text>
  </View>
);

const SearchIcon = ({ setShowSearchBar }) => (
  <TouchableOpacity onPress={() => setShowSearchBar(true)}>
    <Image
      source={searchIcon}
      style={{ width: 30, height: 30, flexDirection: "column-reverse" }}
    />
  </TouchableOpacity>
);

const Header = ({ setShowSearchBar }) => (
  <View style={styles.header}>
    <Logo />
    <SearchIcon setShowSearchBar={setShowSearchBar} />
  </View>
);

const CloseButton = ({ onClosePressed }) => (
  <TouchableOpacity onPress={onClosePressed}>
    <Image source={closeIcon} style={{ width: 12, height: 12 }} />
  </TouchableOpacity>
);

const SearchButton = ({ searchValue, allVideoItems, setVideoItems }) => (
  <TouchableOpacity
    onPress={() => {
      setVideoItems(
        allVideoItems.filter((item) => item.title.includes(searchValue))
      );
    }}
  >
    <Image source={confirmIcon} style={{ width: 25, height: 25 }} />
  </TouchableOpacity>
);

const SearchBar = ({ setShowSearchBar, videoItems, setVideoItems }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allVideoItems, setAllVideoItems] = useState(videoItems);

  const onClosePressed = () => {
    setVideoItems(allVideoItems);
    setSearchValue("");
    setShowSearchBar(false);
  };

  return (
    <View style={styles.header}>
      <ScrollView>
        <CloseButton
          setShowSearchBar={setShowSearchBar}
          onClosePressed={onClosePressed}
        />
        <Text> </Text>
        <TextInput
          style={{ fontSize: 20, backgroundColor: "#f9f9fe", color: "blue" }}
          placeholder="Enter search"
          value={searchValue}
          // onChangeText={(value) => setSearchValue(value)}
          onChangeText={setSearchValue}
        />
        <SearchButton
          setShowSearchBar={setShowSearchBar}
          searchValue={searchValue}
          allVideoItems={allVideoItems}
          setVideoItems={setVideoItems}
        />
      </ScrollView>
    </View>
  );
};

const VideoPost = ({ title, channel, thumbnail }) => (
  <View style={styles.videoPost}>
    <Image source={{ uri: thumbnail }} style={{ width: "100%", height: 200 }} />
    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
      <Text style={styles.videoTitle}>{title}</Text>
      <Text style={styles.channel}>{channel}</Text>
    </View>
  </View>
);
const VideoFeed = ({ data }) => (
  <View style={styles.videoFeed}>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <VideoPost
          title={item.title}
          channel={item.channel}
          thumbnail={item.thumbnail}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  </View>
);

export default function JsonFun() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [videoItems, setVideoItems] = useState([]);

  const fetchPicVideos = async () => {
    const KeyAPI = "AIzaSyByXooPkP4wbdK0ZJphq9p6BLSLUMVpu_s";
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&key=${KeyAPI}`
    );
    const json = await response.json();
    const videoItems = [];
    json.items.forEach((item) => {
      const videoItem = {
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.standard.url,
        channel: item.snippet.channelTitle,
      };
      videoItems.push(videoItem);
    });
    setVideoItems(videoItems);
  };

  useEffect(() => {
    fetchPicVideos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showSearchBar ? (
        <SearchBar
          videoItems={videoItems}
          setShowSearchBar={setShowSearchBar}
          setVideoItems={setVideoItems}
        />
      ) : (
        <Header setShowSearchBar={setShowSearchBar} />
      )}
      {videoItems.length == 0 ? (
        <Button title="Load Feed" onPress={fetchPicVideos} />
      ) : (
        <VideoFeed data={videoItems} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "orange",
  },

  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingBottom: 5,
    flexDirection: "row",
    width: "100%",
  },
  videoFeed: {
    width: "100%",
  },
  videoTitle: {
    fontSize: 18,
  },
  videoPost: {
    marginBottom: 10,
    width: "100%",
  },
  channel: {
    color: "pink",
    fontSize: 20,
    backgroundColor: "yellow",
  },
});
