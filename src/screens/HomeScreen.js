import React,{useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView,
    ToastAndroid
  } from 'react-native';
import {Chip, Title, Button, Modal,Text} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import APIKit from '_services/APIKit';
import {SmallArticleComponent, HeadArticleComponent} from '_molecules';
import Theme from '_assets/Theme';

const HomeScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [pageSize, setpageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [loadingMore, setloadingMore] = useState(false);
    const [country, setCountry] = useState("us");
    const [isOffline, setOfflineStatus] = useState(false);


    useEffect(() => {
      const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
        const offline = !(state.isConnected && state.isInternetReachable);
        setOfflineStatus(offline);
      });

      fetchArticles();
      return () => removeNetInfoSubscription();
    }, [country, loadingMore]);
  
    const fetchArticles = () => {
      setLoading(true);
      APIKit
        .get('/top-headlines?country='+country+'&page='+page+'&pageSize='+pageSize+'&apiKey=c26cde4210c646ac8e4337fab230d202')
        .then(({data}) => {
          setArticles(data.articles);
          isOffline && setOfflineStatus(false);
        })
        .catch((error) => {
          
          //we need to check if connection device has problem?
          if(isOffline){
            ToastAndroid.showWithGravity(
              "Sorry, you need internet connection",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          //we need to check if something wrong in our API KEY
          }else if(error.response.status == 429){
            ToastAndroid.showWithGravity(
              "Sorry, you need to renew the APIKEY, Thank you!",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
          //we need to check if something wrong with the server
          }else{
            ToastAndroid.showWithGravity(
              "Oops, something wrong with our server!",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        })
        .finally(() => {
          setpageSize(pageSize+10); //to show more data, every load more data button click, 3 more new data will show
          setLoading(false); 
          setloadingMore(false);
        });
        
    };

    const NoInternetModal = ({isRetrying}) => (
      <Modal visible={isOffline} contentContainerStyle={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Error</Text>
            <Text style={styles.modalText}>
              Oops! Looks like your device is not connected to the Internet.
            </Text>
            <Button mode={'contained'} onPress={()=>setCountry('us')} disabled={isRetrying}>
              Try Again
            </Button>
          </View>
      </Modal>
    );
    

    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: '#F0F0F0',
          }}
        />
      );
    };

    const renderFooter = () => {
      return (
        //Footer View with Load More button
        <View style={styles.footer}>
          <Button loading={loadingMore} mode="text" >
            {(loadingMore) ? "Load More" : ""}
          </Button>
        </View>
      );
    };

    const renderLoadMore = () => {
      //Hi, I prefer to put sleep 1,5 second before loadmore data, 
      //because it maybe will help to prevent roughly download data
      setTimeout(() => {  
        setloadingMore(true); 
      }, 1500);
    }

    const listEmptyComponent = () =>{
      if(!isLoading){
        return (
          <View style={styles.containerEmpty}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Check Back Later!</Text>
              <Text style={styles.modalText}>
                Oops! Looks like we dont have news for this category. Check it later okay?
              </Text>
              <Button style={{marginTop:20}} mode={'outlined'} onPress={()=>setCountry(country)}>
                Reload Page
              </Button>
            </View>
          </View>
        )
      }else{
        return(<View/>)
      }
    }

    const renderHeader = () => {
      return(
        <View >
          <Title style={styles.sectionTitle}>News</Title>
          <View style={{height:35, marginTop:5}}>
            <ScrollView horizontal={true} >
              <Chip mode="outlined" style={(country=="us") ? styles.chip_active : styles.chip_default} onPress={() => setCountry('us')}>United State</Chip>
              <Chip mode="outlined" style={(country=="uk") ? styles.chip_active : styles.chip_default} onPress={() => setCountry('uk')}>United Kingdom</Chip>
              <Chip mode="outlined" style={(country=="au") ? styles.chip_active : styles.chip_default} onPress={() => setCountry('au')}>Australia</Chip>
              <Chip mode="outlined" style={(country=="sg") ? styles.chip_active : styles.chip_default} onPress={() => setCountry('sg')}>Singapore</Chip>
            </ScrollView>
          </View>
          <View style={styles.header}/>
        </View>
      )
    }

   
    return (
      <SafeAreaView style={styles.containerMain}>
        <FlatList
          ListHeaderComponent={renderHeader}
          style={{marginHorizontal:15}}
          ListEmptyComponent={listEmptyComponent}
          onRefresh={fetchArticles}
          refreshing={isLoading}
          data={articles}
          renderItem={({index,item: articles}) => (
            (index==0) ? <HeadArticleComponent navigation={navigation} article={articles}/> : <SmallArticleComponent article={articles} navigation={navigation}/>
            
          )}
          onEndReached={() => renderLoadMore()}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item, index) => 'key'+index}
          ListFooterComponent={renderFooter}
        />
        <NoInternetModal
          isRetrying={isLoading}
        />
        
      </SafeAreaView>
    );
  };

 

  const styles = StyleSheet.create({
    containerMain:{
      backgroundColor:"#fff", 
      flex:1
    },
    containerStyle:{
      justifyContent: 'flex-end',
      margin: 0,
    },
    header:{
      marginTop:10,
      borderBottomColor: '#F0F0F0',
      borderBottomWidth: 3,
      marginBottom:15,
    }, 
    
    border:{
      borderBottomColor: '#F0F0F0',
      borderBottomWidth: 4,
      marginVertical:5,
    },
    sectionTitle: {
      fontSize:26,
      marginLeft:16,
      marginTop:10
    },
    chip_active:{
      marginHorizontal:5,
      backgroundColor:Theme.colors.accent,
      borderRadius:3,
    },
    chip_default:{
      marginHorizontal:5,
      borderRadius:3,
    },
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
    },
    modalText: {
      fontSize: 18,
      color: '#555',
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    containerEmpty:{
      marginTop:80
   }

  
  });
  
  export default HomeScreen;
  
  