import React, { useRef, useContext, useState } from 'react'
import { SafeAreaView, Text, View,Touchable, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Bottomsheet from '../components/Bottomsheet'
import { MediaContext } from '../components/MediaProvider';
const Music = () => {
    const bottomRef = useRef();
  const [item, setItem] = useState({})
  const handleSetSong = (item) => {

    setItem(item)
    bottomRef.current.show()
  }
  const { songs } = useContext(MediaContext)
  // console.log(songs)
  const renderItem = ({ item }) => { 

    return (
      <TouchableOpacity className="bg-white py-3 mb-3 pl-2 rounded-md" onPress={()=>handleSetSong(item)}>
        {item.filename.length > 40 ? (
          <Text className="text-xl">{item.filename.substring(0, 30)} ...</Text>
        ) : (
          <Text className="text-xl">{item.filename}</Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 justify-center pt-20 px-3 ">
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    
    

      <Bottomsheet bottomRef={bottomRef} item={item } />
    </SafeAreaView>
  );
}

export default Music