import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video } from 'expo-av';
import { Button } from 'react-native-paper';
// import VideoPlayer  from 'react-native-video-player';
// import { VLCPlayer, VlCPlayerView } from "react-native-vlc-media-player";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
const VideoPlayers = ({ route, navigation }) => {
     const { item} = route.params;
  return (
    <View className="flex-1 h-[80%] w-[90%] ">
      {/* <Video
        ref={videoRef}
        source={{
          uri: item?.uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        // onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      /> */}
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: item?.uri,
          },
        }}
        className="h-6 w-10"
      />
    </View>
  );
};

export default VideoPlayers