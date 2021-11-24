import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DetailArticleComponent} from '_molecules';

export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        const {article} = this.props.route.params;

        this.state = {  
            article : article
        }
    }

    render(){
        let {article} = this.state;
        return(
            <ScrollView style={{backgroundColor:"#fff"}}>
                <DetailArticleComponent article={article}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    height15:{
        height:15
    },
    thumbnail:{ 
        marginHorizontal:15, 
        marginBottom:10
    },
    hyperlinkStyle:{
        color: 'blue',
        textDecorationLine: 'underline'
    }
  });

