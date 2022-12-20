import { useEffect, useRef, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Button } from "react-native-paper";
import { MediaContext } from "./MediaProvider";
import * as MediaLibrary from "expo-media-library";
// import  MusicInfo from "expo-music-info";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
const Bottomsheet = ({ bottomRef, item }) => {

  const [sound, setSound] = useState();
  const [playing, setIsPlaying] = useState(true);
  const [pauseObj, setPauseObj] = useState()
  const [song, setSong] = useState()
  const { songs } = useContext(MediaContext);
  const [position, setPosition] = useState(0)
  const [maximum, setMaximum] = useState(0)
  const [minimum, setMinimum] = useState(0)
const [currentSong, setCurrentSong] = useState()
  // console.log(song)
  const [currentid, setCurrentID] = useState(0)
  const getMusicInfo = async () => {
    try {
      // console.log(item)
   
          
    } catch (error) {
      console.log(error)
    }
  }
  
  const findSongIndex = (song) => {
    const songindex = songs.findIndex((s) => s?.id === song?.id);
    return setCurrentID(songindex)
  }
  const playNextSong = () => {
    // console.log(item)
    let id = currentid
    id++
    // console.log(id)
    const nextSong = songs[id]
    // console.log(nextSong)

    playSound(nextSong)
  }

   const playPrevSong = () => {
     let id = currentid;
     id--;
    //  console.log(id);
     const nextSong = songs[id];
     // console.log(nextSong)

     playSound(nextSong);
   };
  const playSound = async (song) => {
    try {
      setSong(song)
      console.log();
      setIsPlaying(true)
      findSongIndex(song)
      const permit = await Audio.getPermissionsAsync();
  
      const { sound } = await Audio.Sound.createAsync({ uri: song?.uri });

      const x = await sound.playAsync();
      setSound(sound);
      
      setCurrentSong(x)
      setPosition(x.positionMillis)
      

      sound._onPlaybackStatusUpdate = async (data) => {
        // console.log(data)
        if (data.isPlaying) {
          setPosition((data.positionMillis))
          setMaximum((data.durationMillis))
          setMinimum((data.playableDurationMillis))
          const date = new Date(data.playableDurationMillis)
          console.log(date.getMinutes() + ":" + date.getSeconds() )
        }
      }

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    playSound(item);
    getMusicInfo()
  }, [item]);
  useEffect(() => {
    findSongIndex(item)
    
  },[])
// console.log(sound)
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  const pauseMusic = async () => {
    const { isLoaded } = await await sound.getStatusAsync();

    if (isLoaded) {
      const pause = await sound.pauseAsync();
      // console.log(pause)
      setPauseObj(pause)
setIsPlaying(pause?.isPlaying)
      // console.log(pause)
    }

  };


  
  console.log(position);
  const continueSong = async () => {
    try {
      setIsPlaying(true)
      await sound.playFromPositionAsync(pauseObj?.positionMillis);
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(currentSong)
  // console.log(sound);
//  console.log(position)
  return (
    <SafeAreaView className="flex-1 justify-center items-center ">
      <BottomSheet
        hasDraggableIcon
        ref={bottomRef}
        height={700}
        draggable
        sheetBackgroundColor="rgba(74,68,67, 0.7)"
      >
        <View className="items-center">
          <Image
            source={require("./loudspeaker.png")}
            className="w-[400] h-[400] opacity-[0.8]"
          />
        </View>

        <View className="px-6">
          <Text className="text-white font-bold text-xl">{song?.filename}</Text>
        </View>
        <View className="mt-6">
          <Slider
            maximumValue={maximum}
            minimumValue={0}
            value={position}
            // onValueChange={(value) => setPosition(value )}
            minimumTrackTintColor={"white"}
            maximumTrackTintColor="gold"
            style={{ height: 5 }}
            thumbTintColor="white"
          />
          <View className="flex-row justify-between px-3 mt-1">
            <Text className="text-white font-bold">0</Text>
            <Text className="text-white font-bold">
              {new Date(maximum - minimum).getMinutes() +
                ":" +
                new Date(maximum - minimum).getSeconds()}
            </Text>
          </View>

          <View className="flex-row justify-between w-[80%] mx-auto mt-7">
            <TouchableOpacity onPress={playPrevSong}>
              <MaterialIcons name="skip-previous" size={54} color="gold" />
            </TouchableOpacity>
            <View className="bg-[#f2f2f2] rounded-full">
              {playing ? (
                <TouchableOpacity onPress={pauseMusic}>
                  <MaterialIcons name="play-arrow" size={54} color="gold" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={continueSong}>
                  <MaterialIcons name="pause" size={54} color="gold" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={playNextSong}>
              <MaterialIcons name="skip-next" size={54} color="gold" />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Bottomsheet;
