import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { getCurrentItem } from '../redux/listSlice';
export interface workType {
  name: string;
}
const List = ({ navigation }) => {
  const { list, isLoading } = useSelector((state: RootState) => state.list);
  const dispatch = useAppDispatch();
  const showCurrentItem = item => {
    dispatch(getCurrentItem({ id: item.id }));
    navigation.navigate('Detail', { item });
  };
  return (
    <View>
      {isLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showCurrentItem(item)}>
              <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                  <Text style={styles.title}>{item.companyName}</Text>
                  <Image
                    source={{ uri: `${item.logo}` }}
                    width={60}
                    height={60}
                  />
                </View>
                {item.workTypes?.map((wType: workType, index) => (
                  <View key={index}>
                    <Text style={styles.desc}>{wType.name}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 18,
  },
  listContainer: {
    boxSizing: 'border-box',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
export default List;
