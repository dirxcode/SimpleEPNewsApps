import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Linking
  } from 'react-native';
import { Card, Title, Paragraph,Caption,Subheading } from 'react-native-paper';
import Moment from 'moment';
Moment.locale('en');

const HeadArticleComponent = ({article, navigation}) => (
    <Card elevation={0}  onPress={()=> navigation.navigate('DetailScreen', {article : article})}>
        <Card.Cover source={{ uri: article.urlToImage }}/>
        <Card.Content>
        <Caption>{article.source.name}</Caption>
        <Title>{article.title}</Title>
        <Paragraph>{article.description}</Paragraph>
        </Card.Content>
    </Card>
);
  
export const SmallArticleComponent = ({article, navigation}) => (
    <Card style={{paddingVertical:10}} onPress={()=> navigation.navigate('DetailScreen', {article : article})}>
        <View style={{flexDirection:"row"}}>
        <View style={{flex : 1}}>
            <Image source={{ uri: article.urlToImage }} style={styles.thumbnail_small} />
        </View>
        <View style={{flex : 3}}>
            <Caption>{article.source.name}</Caption>
            <Title>{article.title}</Title>
            <Caption>{Moment(article.publishedAt).format('MMMM d, y')}</Caption>
        </View>
        </View>
    </Card>
);

export const DetailArticleComponent = ({article}) => (
    <Card>
        <Card.Title
            title="Details"
        />
        <Card.Cover style={styles.thumbnail_detail} source={{ uri: article.urlToImage }}/>
        <Card.Content>
            <Caption>{article.source.name}</Caption>
            <Title>{article.title}</Title>
            <Subheading>{article.author} | {Moment(article.publishedAt).format('MMMM d, y')}</Subheading>
            <View style={styles.height15}/>
            <Paragraph>{article.description}</Paragraph>
            <View style={styles.height15}/>
            <Paragraph>{article.content}</Paragraph>
            <View style={styles.height15}/>
            <Paragraph style={styles.hyperlinkStyle} onPress={() => {
                Linking.openURL(article.url);
                }}>{article.url}</Paragraph>
        </Card.Content>
    </Card>
);

const styles = StyleSheet.create({
    thumbnail_small: {
      width: 81,
      height: 93,
    },
    height15:{
        height:15
    },
    thumbnail_detail:{ 
        marginHorizontal:15, 
        marginBottom:10
    },
    hyperlinkStyle:{
        color: 'blue',
        textDecorationLine: 'underline'
    }
});

export default HeadArticleComponent;

