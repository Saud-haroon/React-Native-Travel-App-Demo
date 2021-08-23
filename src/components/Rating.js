import React from 'react'
import { View, Text, Image } from 'react-native'

import {icons} from '../constants'

const Rating = ({containerStyle, rate}) => {

     const starCompnents = []

     for (var i = 0; i < rate; i++) {
         starCompnents.push(
             <Image
                key={`full-${i}`}
                source={icons.star}
                resizeMode='cover'
                style={{
                    marginLeft: i == 0 ? 0 : 5,
                    width:15,
                    height:15
                }}
             />
         )
         
     }

    return (
        <View style={{flexDirection:'row', ...containerStyle}}>
            {starCompnents}
        </View>
    )
}

export default Rating
