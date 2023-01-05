import {useContext, useRef, useState} from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { MediaContext } from '../components/MediaProvider';
import {Video} from 'expo-av'
import VideoPlayer from '../components/VideoPlayer';
import { Provider, Dialog, Portal } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
const VideoMedia = () => {
  const { video } = useContext(MediaContext)
  const [visible, setVisible] = useState(false);
  const navigation =useNavigation()

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [item, setItem] = useState({});
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
     const handleSetVideo = async () => {
      
       status.isPlaying
         ? videoRef?.current?.pauseAsync()
         : videoRef?.current?.playAsync();

  }; 
  const onPlaybackStatusUpdate = (status) => {
     setStatus(() => status);
  }
  const renderItem = ({ item }) => {
    // console.log("item", item)
    return (
      <TouchableOpacity
      className="bg-white py-3 mb-3 pl-2 rounded-md"
      onPress={() => {
        
        handleSetVideo(item)
   navigation.navigate("VideoPlayer", {item});
        setItem(item);
          }}
        >
          {item.filename.length > 40 ? (
            <Text className="text-xl">
              {item.filename.substring(0, 30)} ...
            </Text>
          ) : (
            <Text className="text-xl">{item.filename}</Text>
          )}
        </TouchableOpacity>
      );
  };
  


  return (
    <SafeAreaView className="flex-1 justify-center pt-20 px-3 ">
      <FlatList
        data={video}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>

         <Dialog.Content> */}
 
              {/* <VideoPlayer item={item} onPlaybackStatusUpdate={onPlaybackStatusUpdate} videoRef={videoRef} />
              <Text>dkjdklsjdkljdfs</Text> */}
            {/* </Dialog.Content>
          </Dialog>
           </Portal> */}
{/* // </Provider> */}
    </SafeAreaView>
  );
}

export default VideoMedia