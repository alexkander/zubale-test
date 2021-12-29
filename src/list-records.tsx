import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { AppState, getRecords } from './reducers';

const ListRecords = (props: any) => {
  useEffect(() => {
    props.getRecords();
  }, []);

  console.log('ListRecords props', props);

  if (props.loading) {
    return (
      <View>
        <Text>loading records</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={props.records}
      renderItem={({ item }) => (
        <View key={item.id} style={style.item}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

const style = StyleSheet.create({
  item: {
    padding: 10,
  },
});

const mapStateToProps = (state: AppState) => ({ ...state });

export default connect(mapStateToProps, { getRecords })(ListRecords);
