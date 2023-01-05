import { View, Text } from 'react-native'
import { createContext, useEffect, useState } from 'react'

import * as MediaLibrary from "expo-media-library";
export const MediaContext = createContext()



const MediaProvider = ({children}) => {
  const [songs, setSongs] = useState([])
  const [video, setVideo] = useState([])
  const getMediaLibrary = async () => {
        try {
                let { status } = await MediaLibrary.requestPermissionsAsync();
          console.log(status);
        
                let music = await MediaLibrary.getAssetsAsync({
                  mediaType: ["audio"],
                });
                
         music =  await MediaLibrary.getAssetsAsync({
           mediaType: ["audio"],
           first:music.totalCount
          });
          setSongs(music.assets); 
          

          let video = await MediaLibrary.getAssetsAsync({ mediaType: "video" })
          video = await MediaLibrary.getAssetsAsync({ mediaType: "video", first: video.totalCount });
          setVideo(video.assets)
        } catch (error) {
          console.log(error)
        }
     
    };
    
    useEffect(() => {
        getMediaLibrary()
    },[])
  return (
    <MediaContext.Provider value={{songs, video}}>
{children}
    </MediaContext.Provider>
  )
}

export default MediaProvider