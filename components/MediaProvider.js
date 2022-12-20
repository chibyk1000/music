import { View, Text } from 'react-native'
import { createContext, useEffect, useState } from 'react'

import * as MediaLibrary from "expo-media-library";
export const MediaContext = createContext()



const MediaProvider = ({children}) => {
const [songs, setSongs] =useState([])
  const getMediaLibrary = async () => {
        try {
                let { status } = await MediaLibrary.requestPermissionsAsync();
          console.log(status);
        
                let music = await MediaLibrary.getAssetsAsync({
                  mediaType: ["audio"],
                });
                // let info = await MediaLibrary.getAssetInfoAsync({
                  
                //   mediaType: ["music"],
                // });
                // console.log(info);
                //   console.log(music.assets);

                setSongs(music.assets); 
        } catch (error) {
          console.log(error)
        }
     
    };
    
    useEffect(() => {
        getMediaLibrary()
    },[])
  return (
    <MediaContext.Provider value={{songs}}>
{children}
    </MediaContext.Provider>
  )
}

export default MediaProvider